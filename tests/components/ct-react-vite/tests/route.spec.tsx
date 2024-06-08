/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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

import { test, expect } from '@playwright/experimental-ct-react';
import TitleWithFont from '@/components/TitleWithFont';

test('should load font without routes', async ({ mount, page }) => {
  const promise = page.waitForEvent('requestfinished', request => request.url().includes('iconfont'));
  await mount(<TitleWithFont />);
  const request = await promise;
  const response = await request.response();
  const body = await response!.body();
  expect(body.length).toBe(2656);
});

test('should load font with routes', async ({ mount, page }) => {
  test.info().annotations.push({ type: 'issue', description: 'https://github.com/microsoft/playwright/issues/27294' });
  await page.route('**/*.json', r => r.continue());
  const promise = page.waitForEvent('requestfinished', request => request.url().includes('iconfont'));
  await mount(<TitleWithFont />);
  const request = await promise;
  const response = await request.response();
  const body = await response!.body();
  expect(body.length).toBe(2656);
});
