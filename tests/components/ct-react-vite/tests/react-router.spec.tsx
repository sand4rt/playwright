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
import App from '@/App';
import type { HooksConfig } from '../playwright';

test('navigate to a page by clicking a link', async ({ page, mount }) => {
  const component = await mount<HooksConfig>(<App />, {
    hooksConfig: { routing: true },
  });
  await expect(component.getByRole('main')).toHaveText('Login');
  await expect(page).toHaveURL('/');
  await component.getByRole('link', { name: 'Dashboard' }).click();
  await expect(component.getByRole('main')).toHaveText('Dashboard');
  await expect(page).toHaveURL('/dashboard');
});

test('update should not reset mount hooks', async ({ mount }) => {
  const component = await mount<HooksConfig>(<App title="before" />, {
    hooksConfig: { routing: true },
  });
  await expect(component.getByRole('heading')).toHaveText('before');
  await expect(component.getByRole('main')).toHaveText('Login');

  await component.update(<App title="after" />);
  await expect(component.getByRole('heading')).toHaveText('after');
  await expect(component.getByRole('main')).toHaveText('Login');
});
