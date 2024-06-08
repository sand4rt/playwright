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
import Button from '@/components/Button';
import EmptyFragment from '@/components/EmptyFragment';
import { ComponentAsProp } from '@/components/ComponentAsProp';

test('render props', async ({ mount }) => {
  const component = await mount(<Button title="Submit" />);
  await expect(component).toContainText('Submit');
});

test('render component as props', async ({ mount }) => {
  const component = await mount(
      <ComponentAsProp component={<Button title="Submit" />} />
  );
  await expect(component.getByRole('button', { name: 'submit' })).toBeVisible();
});

test('render jsx array as props', async ({ mount }) => {
  const component = await mount(
      <ComponentAsProp component={[<h4>{[4]}</h4>, [[<p>[2,3]</p>]]]} />
  );
  await expect(component.getByRole('heading', { level: 4 })).toHaveText('4');
  await expect(component.getByRole('paragraph')).toHaveText('[2,3]');
});

test('render attributes', async ({ mount }) => {
  const component = await mount(<Button className="primary" title="Submit" />);
  await expect(component).toHaveClass('primary');
});

test('render an empty component', async ({ mount, page }) => {
  const component = await mount(<EmptyFragment />);
  expect(await page.evaluate(() => 'props' in window && window.props)).toEqual({});
  expect(await component.allTextContents()).toEqual(['']);
  expect(await component.textContent()).toBe('');
  await expect(component).toHaveText('');
});
