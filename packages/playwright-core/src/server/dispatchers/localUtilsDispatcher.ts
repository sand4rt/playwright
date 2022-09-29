/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import type * as channels from '@protocol/channels';
import { ManualPromise } from '../../utils/manualPromise';
import { assert, createGuid } from '../../utils';
import type { RootDispatcher } from './dispatcher';
import { Dispatcher } from './dispatcher';
import { yazl, yauzl } from '../../zipBundle';
import { ZipFile } from '../../utils/zipFile';
import type * as har from '@trace/har';
import type { HeadersArray } from '../types';
import { JsonPipeDispatcher } from '../dispatchers/jsonPipeDispatcher';
import * as socks from '../../common/socksProxy';
import { WebSocketTransport } from '../transport';
import type { CallMetadata } from '../instrumentation';
import { getUserAgent } from '../../common/userAgent';
import type { Progress } from '../progress';
import { ProgressController } from '../progress';
import { findValidator, ValidationError } from '../../protocol/validator';
import type { ValidatorContext } from '../../protocol/validator';
import { fetchData } from '../../common/netUtils';
import type { HTTPRequestParams } from '../../common/netUtils';
import type http from 'http';
import type { Playwright } from '../playwright';
import { SdkObject } from '../../server/instrumentation';

export class LocalUtilsDispatcher extends Dispatcher<{ guid: string }, channels.LocalUtilsChannel, RootDispatcher> implements channels.LocalUtilsChannel {
  _type_LocalUtils: boolean;
  private _harBakends = new Map<string, HarBackend>();

  constructor(scope: RootDispatcher, playwright: Playwright) {
    const localUtils = new SdkObject(playwright, 'localUtils', 'localUtils');
    super(scope, localUtils, 'LocalUtils', {});
    this._type_LocalUtils = true;
  }

  async zip(params: channels.LocalUtilsZipParams, metadata: CallMetadata): Promise<void> {
    const promise = new ManualPromise<void>();
    const zipFile = new yazl.ZipFile();
    (zipFile as any as EventEmitter).on('error', error => promise.reject(error));

    for (const entry of params.entries) {
      try {
        if (fs.statSync(entry.value).isFile())
          zipFile.addFile(entry.value, entry.name);
      } catch (e) {
      }
    }

    if (!fs.existsSync(params.zipFile)) {
      // New file, just compress the entries.
      await fs.promises.mkdir(path.dirname(params.zipFile), { recursive: true });
      zipFile.end(undefined, () => {
        zipFile.outputStream.pipe(fs.createWriteStream(params.zipFile)).on('close', () => promise.resolve());
      });
      return promise;
    }

    // File already exists. Repack and add new entries.
    const tempFile = params.zipFile + '.tmp';
    await fs.promises.rename(params.zipFile, tempFile);

    yauzl.open(tempFile, (err, inZipFile) => {
      if (err) {
        promise.reject(err);
        return;
      }
      assert(inZipFile);
      let pendingEntries = inZipFile.entryCount;
      inZipFile.on('entry', entry => {
        inZipFile.openReadStream(entry, (err, readStream) => {
          if (err) {
            promise.reject(err);
            return;
          }
          zipFile.addReadStream(readStream!, entry.fileName);
          if (--pendingEntries === 0) {
            zipFile.end(undefined, () => {
              zipFile.outputStream.pipe(fs.createWriteStream(params.zipFile)).on('close', () => {
                fs.promises.unlink(tempFile).then(() => {
                  promise.resolve();
                });
              });
            });
          }
        });
      });
    });
    return promise;
  }

  async harOpen(params: channels.LocalUtilsHarOpenParams, metadata: CallMetadata): Promise<channels.LocalUtilsHarOpenResult> {
    let harBackend: HarBackend;
    if (params.file.endsWith('.zip')) {
      const zipFile = new ZipFile(params.file);
      const entryNames = await zipFile.entries();
      const harEntryName = entryNames.find(e => e.endsWith('.har'));
      if (!harEntryName)
        return { error: 'Specified archive does not have a .har file' };
      const har = await zipFile.read(harEntryName);
      const harFile = JSON.parse(har.toString()) as har.HARFile;
      harBackend = new HarBackend(harFile, null, zipFile);
    } else {
      const harFile = JSON.parse(await fs.promises.readFile(params.file, 'utf-8')) as har.HARFile;
      harBackend = new HarBackend(harFile, path.dirname(params.file), null);
    }
    this._harBakends.set(harBackend.id, harBackend);
    return { harId: harBackend.id };
  }

  async harLookup(params: channels.LocalUtilsHarLookupParams, metadata: CallMetadata): Promise<channels.LocalUtilsHarLookupResult> {
    const harBackend = this._harBakends.get(params.harId);
    if (!harBackend)
      return { action: 'error', message: `Internal error: har was not opened` };
    return await harBackend.lookup(params.url, params.method, params.headers, params.postData, params.isNavigationRequest);
  }

  async harClose(params: channels.LocalUtilsHarCloseParams, metadata: CallMetadata): Promise<void> {
    const harBackend = this._harBakends.get(params.harId);
    if (harBackend) {
      this._harBakends.delete(harBackend.id);
      harBackend.dispose();
    }
  }

  async harUnzip(params: channels.LocalUtilsHarUnzipParams, metadata: CallMetadata): Promise<void> {
    const dir = path.dirname(params.zipFile);
    const zipFile = new ZipFile(params.zipFile);
    for (const entry of await zipFile.entries()) {
      const buffer = await zipFile.read(entry);
      if (entry === 'har.har')
        await fs.promises.writeFile(params.harFile, buffer);
      else
        await fs.promises.writeFile(path.join(dir, entry), buffer);
    }
    zipFile.close();
    await fs.promises.unlink(params.zipFile);
  }

  async connect(params: channels.LocalUtilsConnectParams, metadata: CallMetadata): Promise<channels.LocalUtilsConnectResult> {
    const controller = new ProgressController(metadata, this._object as SdkObject);
    controller.setLogName('browser');
    return await controller.run(async progress => {
      const paramsHeaders = Object.assign({ 'User-Agent': getUserAgent() }, params.headers || {});
      const wsEndpoint = await urlToWSEndpoint(progress, params.wsEndpoint);

      const transport = await WebSocketTransport.connect(progress, wsEndpoint, paramsHeaders, true);
      let socksInterceptor: SocksInterceptor | undefined;
      const pipe = new JsonPipeDispatcher(this);
      transport.onmessage = json => {
        if (json.method === '__create__' && json.params.type === 'SocksSupport')
          socksInterceptor = new SocksInterceptor(transport, params.socksProxyRedirectPortForTest, json.params.guid);
        if (socksInterceptor?.interceptMessage(json))
          return;
        const cb = () => {
          try {
            pipe.dispatch(json);
          } catch (e) {
            transport.close();
          }
        };
        if (params.slowMo)
          setTimeout(cb, params.slowMo);
        else
          cb();
      };
      pipe.on('message', message => {
        transport.send(message);
      });
      transport.onclose = () => {
        socksInterceptor?.cleanup();
        pipe.wasClosed();
      };
      pipe.on('close', () => transport.close());
      return { pipe };
    }, params.timeout || 0);
  }

}

const redirectStatus = [301, 302, 303, 307, 308];

class HarBackend {
  readonly id = createGuid();
  private _harFile: har.HARFile;
  private _zipFile: ZipFile | null;
  private _baseDir: string | null;

  constructor(harFile: har.HARFile, baseDir: string | null, zipFile: ZipFile | null) {
    this._harFile = harFile;
    this._baseDir = baseDir;
    this._zipFile = zipFile;
  }

  async lookup(url: string, method: string, headers: HeadersArray, postData: Buffer | undefined, isNavigationRequest: boolean): Promise<{
      action: 'error' | 'redirect' | 'fulfill' | 'noentry',
      message?: string,
      redirectURL?: string,
      status?: number,
      headers?: HeadersArray,
      body?: Buffer }> {
    let entry;
    try {
      entry = await this._harFindResponse(url, method, headers, postData);
    } catch (e) {
      return { action: 'error', message: 'HAR error: ' + e.message };
    }

    if (!entry)
      return { action: 'noentry' };

    // If navigation is being redirected, restart it with the final url to ensure the document's url changes.
    if (entry.request.url !== url && isNavigationRequest)
      return { action: 'redirect', redirectURL: entry.request.url };

    const response = entry.response;
    try {
      const buffer = await this._loadContent(response.content);
      return {
        action: 'fulfill',
        status: response.status,
        headers: response.headers,
        body: buffer,
      };
    } catch (e) {
      return { action: 'error', message: e.message };
    }
  }

  private async _loadContent(content: { text?: string, encoding?: string, _file?: string }): Promise<Buffer> {
    const file = content._file;
    let buffer: Buffer;
    if (file) {
      if (this._zipFile)
        buffer = await this._zipFile.read(file);
      else
        buffer = await fs.promises.readFile(path.resolve(this._baseDir!, file));
    } else {
      buffer = Buffer.from(content.text || '', content.encoding === 'base64' ? 'base64' : 'utf-8');
    }
    return buffer;
  }

  private async _harFindResponse(url: string, method: string, headers: HeadersArray, postData: Buffer | undefined): Promise<har.Entry | undefined> {
    const harLog = this._harFile.log;
    const visited = new Set<har.Entry>();
    while (true) {
      const entries: har.Entry[] = [];
      for (const candidate of harLog.entries) {
        if (candidate.request.url !== url || candidate.request.method !== method)
          continue;
        if (method === 'POST' && postData && candidate.request.postData) {
          const buffer = await this._loadContent(candidate.request.postData);
          if (!buffer.equals(postData))
            continue;
        }
        entries.push(candidate);
      }

      if (!entries.length)
        return;

      let entry = entries[0];

      // Disambiguate using headers - then one with most matching headers wins.
      if (entries.length > 1) {
        const list: { candidate: har.Entry, matchingHeaders: number }[] = [];
        for (const candidate of entries) {
          const matchingHeaders = countMatchingHeaders(candidate.request.headers, headers);
          list.push({ candidate, matchingHeaders });
        }
        list.sort((a, b) => b.matchingHeaders - a.matchingHeaders);
        entry = list[0].candidate;
      }

      if (visited.has(entry))
        throw new Error(`Found redirect cycle for ${url}`);

      visited.add(entry);

      // Follow redirects.
      const locationHeader = entry.response.headers.find(h => h.name.toLowerCase() === 'location');
      if (redirectStatus.includes(entry.response.status) && locationHeader) {
        const locationURL = new URL(locationHeader.value, url);
        url = locationURL.toString();
        if ((entry.response.status === 301 || entry.response.status === 302) && method === 'POST' ||
          entry.response.status === 303 && !['GET', 'HEAD'].includes(method)) {
          // HTTP-redirect fetch step 13 (https://fetch.spec.whatwg.org/#http-redirect-fetch)
          method = 'GET';
        }
        continue;
      }

      return entry;
    }
  }

  dispose() {
    this._zipFile?.close();
  }
}

class SocksInterceptor {
  private _handler: socks.SocksProxyHandler;
  private _channel: channels.SocksSupportChannel & EventEmitter;
  private _socksSupportObjectGuid: string;
  private _ids = new Set<number>();

  constructor(transport: WebSocketTransport, redirectPortForTest: number | undefined, socksSupportObjectGuid: string) {
    this._handler = new socks.SocksProxyHandler(redirectPortForTest);
    this._socksSupportObjectGuid = socksSupportObjectGuid;

    let lastId = -1;
    this._channel = new Proxy(new EventEmitter(), {
      get: (obj: any, prop) => {
        if ((prop in obj) || obj[prop] !== undefined || typeof prop !== 'string')
          return obj[prop];
        return (params: any) => {
          try {
            const id = --lastId;
            this._ids.add(id);
            const validator = findValidator('SocksSupport', prop, 'Params');
            params = validator(params, '', { tChannelImpl: tChannelForSocks, binary: 'toBase64' });
            transport.send({ id, guid: socksSupportObjectGuid, method: prop, params, metadata: { stack: [], apiName: '', internal: true } } as any);
          } catch (e) {
          }
        };
      },
    }) as channels.SocksSupportChannel & EventEmitter;
    this._handler.on(socks.SocksProxyHandler.Events.SocksConnected, (payload: socks.SocksSocketConnectedPayload) => this._channel.socksConnected(payload));
    this._handler.on(socks.SocksProxyHandler.Events.SocksData, (payload: socks.SocksSocketDataPayload) => this._channel.socksData(payload));
    this._handler.on(socks.SocksProxyHandler.Events.SocksError, (payload: socks.SocksSocketErrorPayload) => this._channel.socksError(payload));
    this._handler.on(socks.SocksProxyHandler.Events.SocksFailed, (payload: socks.SocksSocketFailedPayload) => this._channel.socksFailed(payload));
    this._handler.on(socks.SocksProxyHandler.Events.SocksEnd, (payload: socks.SocksSocketEndPayload) => this._channel.socksEnd(payload));
    this._channel.on('socksRequested', payload => this._handler.socketRequested(payload));
    this._channel.on('socksClosed', payload => this._handler.socketClosed(payload));
    this._channel.on('socksData', payload => this._handler.sendSocketData(payload));
  }

  cleanup() {
    this._handler.cleanup();
  }

  interceptMessage(message: any): boolean {
    if (this._ids.has(message.id)) {
      this._ids.delete(message.id);
      return true;
    }
    if (message.guid === this._socksSupportObjectGuid) {
      const validator = findValidator('SocksSupport', message.method, 'Event');
      const params = validator(message.params, '', { tChannelImpl: tChannelForSocks, binary: 'fromBase64' });
      this._channel.emit(message.method, params);
      return true;
    }
    return false;
  }
}

function countMatchingHeaders(harHeaders: har.Header[], headers: HeadersArray): number {
  const set = new Set(headers.map(h => h.name.toLowerCase() + ':' + h.value));
  let matches = 0;
  for (const h of harHeaders) {
    if (set.has(h.name.toLowerCase() + ':' + h.value))
      ++matches;
  }
  return matches;
}

function tChannelForSocks(names: '*' | string[], arg: any, path: string, context: ValidatorContext) {
  throw new ValidationError(`${path}: channels are not expected in SocksSupport`);
}

async function urlToWSEndpoint(progress: Progress, endpointURL: string): Promise<string> {
  if (endpointURL.startsWith('ws'))
    return endpointURL;

  progress.log(`<ws preparing> retrieving websocket url from ${endpointURL}`);
  const fetchUrl = new URL(endpointURL);
  if (!fetchUrl.pathname.endsWith('/'))
    fetchUrl.pathname += '/';
  fetchUrl.pathname += 'json';
  const json = await fetchData({
    url: fetchUrl.toString(),
    method: 'GET',
    timeout: progress.timeUntilDeadline(),
    headers: { 'User-Agent': getUserAgent() },
  }, async (params: HTTPRequestParams, response: http.IncomingMessage) => {
    return new Error(`Unexpected status ${response.statusCode} when connecting to ${fetchUrl.toString()}.\n` +
        `This does not look like a Playwright server, try connecting via ws://.`);
  });
  progress.throwIfAborted();

  const wsUrl = new URL(endpointURL);
  let wsEndpointPath = JSON.parse(json).wsEndpointPath;
  if (wsEndpointPath.startsWith('/'))
    wsEndpointPath = wsEndpointPath.substring(1);
  if (!wsUrl.pathname.endsWith('/'))
    wsUrl.pathname += '/';
  wsUrl.pathname += wsEndpointPath;
  wsUrl.protocol = wsUrl.protocol === 'https:' ? 'wss:' : 'ws:';
  return wsUrl.toString();
}