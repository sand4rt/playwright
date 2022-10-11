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

/* eslint-disable no-console */

import fs from 'fs';
import * as playwright from '../..';
import type { BrowserType } from '../client/browserType';
import type { LaunchServerOptions } from '../client/types';
import { createPlaywright, DispatcherConnection, RootDispatcher, PlaywrightDispatcher } from '../server';
import type { Playwright } from '../server/playwright';
import { IpcTransport, PipeTransport } from '../protocol/transport';
import { PlaywrightServer } from '../remote/playwrightServer';
import { gracefullyCloseAll } from '../utils/processLauncher';
import type { Mode } from '@recorder/recorderTypes';
import { DebugController } from '../server/debugController';

export function printApiJson() {
  // Note: this file is generated by build-playwright-driver.sh
  console.log(JSON.stringify(require('../../api.json')));
}

export function runDriver() {
  const dispatcherConnection = new DispatcherConnection();
  new RootDispatcher(dispatcherConnection, async (rootScope, { sdkLanguage }) => {
    const playwright = createPlaywright(sdkLanguage);
    return new PlaywrightDispatcher(rootScope, playwright);
  });
  const transport = process.send ? new IpcTransport(process) : new PipeTransport(process.stdout, process.stdin);
  transport.onmessage = message => dispatcherConnection.dispatch(JSON.parse(message));
  dispatcherConnection.onmessage = message => transport.send(JSON.stringify(message));
  transport.onclose = () => {
    // Drop any messages during shutdown on the floor.
    dispatcherConnection.onmessage = () => {};
    selfDestruct();
  };
}

export async function runServer(port: number | undefined, path = '/', maxClients = Infinity, enableSocksProxy = true, reuseBrowser = false) {
  const maxIncomingConnections = maxClients;
  const maxConcurrentConnections = reuseBrowser ? 1 : maxClients;
  const server = new PlaywrightServer(reuseBrowser ? 'reuse-browser' : 'auto', { path, maxIncomingConnections, maxConcurrentConnections, enableSocksProxy });
  const wsEndpoint = await server.listen(port);
  process.on('exit', () => server.close().catch(console.error));
  console.log('Listening on ' + wsEndpoint);  // eslint-disable-line no-console
  process.stdin.on('close', () => selfDestruct());
  if (reuseBrowser && process.send)
    wireController(server.preLaunchedPlaywright(), wsEndpoint);
}

export async function launchBrowserServer(browserName: string, configFile?: string) {
  let options: LaunchServerOptions = {};
  if (configFile)
    options = JSON.parse(fs.readFileSync(configFile).toString());
  const browserType = (playwright as any)[browserName] as BrowserType;
  const server = await browserType.launchServer(options);
  console.log(server.wsEndpoint());
}

function selfDestruct() {
  // Force exit after 30 seconds.
  setTimeout(() => process.exit(0), 30000);
  // Meanwhile, try to gracefully close all browsers.
  gracefullyCloseAll().then(() => {
    process.exit(0);
  });
}

class ProtocolHandler {
  private _controller: DebugController;

  constructor(playwright: Playwright) {
    this._controller = playwright.debugController;
    this._controller.setAutoCloseAllowed(true);
    this._controller.setTrackHierarcy(true);
    this._controller.setReuseBrowser(true);
    this._controller.on(DebugController.Events.BrowsersChanged, browsers => {
      process.send!({ method: 'browsersChanged', params: { browsers } });
    });
    this._controller.on(DebugController.Events.InspectRequested, ({ selector, locators }) => {
      process.send!({ method: 'inspectRequested', params: { selector, locators } });
    });
  }

  async resetForReuse() {
    await this._controller.resetForReuse();
  }

  async navigate(params: { url: string }) {
    await this._controller.navigateAll(params.url);
  }

  async setMode(params: { mode: Mode, language?: string, file?: string }) {
    await this._controller.setRecorderMode(params);
  }

  async setAutoClose(params: { enabled: boolean }) {
    await this._controller.setAutoCloseEnabled(params.enabled);
  }

  async highlight(params: { selector: string }) {
    await this._controller.highlightAll(params.selector);
  }

  async hideHighlight() {
    await this._controller.hideHighlightAll();
  }

  async closeAllBrowsers() {
    await this._controller.closeAllBrowsers();
  }

  async kill() {
    await this._controller.kill();
  }
}

function wireController(playwright: Playwright, wsEndpoint: string) {
  process.send!({ method: 'ready', params: { wsEndpoint } });
  const handler = new ProtocolHandler(playwright);
  process.on('message', async message => {
    try {
      const result = await (handler as any)[message.method](message.params);
      process.send!({ id: message.id, result });
    } catch (e) {
      process.send!({ id: message.id, error: e.toString() });
    }
  });
}
