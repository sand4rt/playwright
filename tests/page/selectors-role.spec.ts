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

import { test, expect } from './pageTest';

test('should detect roles', async ({ page }) => {
  await page.setContent(`
    <button>Hello</button>
    <select multiple="" size="2"></select>
    <select></select>
    <h3>Heading</h3>
    <details><summary>Hello</summary></details>
    <div role="dialog">I am a dialog</div>
  `);
  expect(await page.locator(`role=button`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hello</button>`,
  ]);
  expect(await page.locator(`role=listbox`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<select multiple="" size="2"></select>`,
  ]);
  expect(await page.locator(`role=combobox`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<select></select>`,
  ]);
  expect(await page.locator(`role=heading`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<h3>Heading</h3>`,
  ]);
  expect(await page.locator(`role=group`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<details><summary>Hello</summary></details>`,
  ]);
  expect(await page.locator(`role=dialog`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="dialog">I am a dialog</div>`,
  ]);
  expect(await page.locator(`role=menuitem`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
  ]);
  expect(await page.getByRole('menuitem').evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
  ]);
});

test('should support selected', async ({ page }) => {
  await page.setContent(`
    <select>
      <option>Hi</option>
      <option selected>Hello</option>
    </select>
    <div>
      <div role="option" aria-selected="true">Hi</div>
      <div role="option" aria-selected="false">Hello</div>
    </div>
  `);
  expect(await page.locator(`role=option[selected]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<option selected="">Hello</option>`,
    `<div role="option" aria-selected="true">Hi</div>`,
  ]);

  expect(await page.locator(`role=option[selected=true]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<option selected="">Hello</option>`,
    `<div role="option" aria-selected="true">Hi</div>`,
  ]);
  expect(await page.getByRole('option', { selected: true }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<option selected="">Hello</option>`,
    `<div role="option" aria-selected="true">Hi</div>`,
  ]);

  expect(await page.locator(`role=option[selected=false]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<option>Hi</option>`,
    `<div role="option" aria-selected="false">Hello</div>`,
  ]);
  expect(await page.getByRole('option', { selected: false }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<option>Hi</option>`,
    `<div role="option" aria-selected="false">Hello</div>`,
  ]);
});

test('should support checked', async ({ page }) => {
  await page.setContent(`
    <input type=checkbox>
    <input type=checkbox checked>
    <input type=checkbox indeterminate>
    <div role=checkbox aria-checked="true">Hi</div>
    <div role=checkbox aria-checked="false">Hello</div>
    <div role=checkbox>Unknown</div>
  `);
  await page.$eval('[indeterminate]', input => (input as HTMLInputElement).indeterminate = true);

  expect(await page.locator(`role=checkbox[checked]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<input type="checkbox" checked="">`,
    `<div role="checkbox" aria-checked="true">Hi</div>`,
  ]);
  expect(await page.locator(`role=checkbox[checked=true]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<input type="checkbox" checked="">`,
    `<div role="checkbox" aria-checked="true">Hi</div>`,
  ]);
  expect(await page.getByRole('checkbox', { checked: true }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<input type="checkbox" checked="">`,
    `<div role="checkbox" aria-checked="true">Hi</div>`,
  ]);

  expect(await page.locator(`role=checkbox[checked=false]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<input type="checkbox">`,
    `<div role="checkbox" aria-checked="false">Hello</div>`,
    `<div role="checkbox">Unknown</div>`,
  ]);
  expect(await page.getByRole('checkbox', { checked: false }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<input type="checkbox">`,
    `<div role="checkbox" aria-checked="false">Hello</div>`,
    `<div role="checkbox">Unknown</div>`,
  ]);

  expect(await page.locator(`role=checkbox[checked="mixed"]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<input type="checkbox" indeterminate="">`,
  ]);
  expect(await page.locator(`role=checkbox`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<input type="checkbox">`,
    `<input type="checkbox" checked="">`,
    `<input type="checkbox" indeterminate="">`,
    `<div role="checkbox" aria-checked="true">Hi</div>`,
    `<div role="checkbox" aria-checked="false">Hello</div>`,
    `<div role="checkbox">Unknown</div>`,
  ]);
});

test('should support pressed', async ({ page }) => {
  await page.setContent(`
    <button>Hi</button>
    <button aria-pressed="true">Hello</button>
    <button aria-pressed="false">Bye</button>
    <button aria-pressed="mixed">Mixed</button>
  `);
  expect(await page.locator(`role=button[pressed]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button aria-pressed="true">Hello</button>`,
  ]);
  expect(await page.locator(`role=button[pressed=true]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button aria-pressed="true">Hello</button>`,
  ]);
  expect(await page.getByRole('button', { pressed: true }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button aria-pressed="true">Hello</button>`,
  ]);
  expect(await page.locator(`role=button[pressed=false]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button aria-pressed="false">Bye</button>`,
  ]);
  expect(await page.getByRole('button', { pressed: false }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button aria-pressed="false">Bye</button>`,
  ]);
  expect(await page.locator(`role=button[pressed="mixed"]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button aria-pressed="mixed">Mixed</button>`,
  ]);
  expect(await page.locator(`role=button`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button aria-pressed="true">Hello</button>`,
    `<button aria-pressed="false">Bye</button>`,
    `<button aria-pressed="mixed">Mixed</button>`,
  ]);
});

test('should support expanded', async ({ page }) => {
  await page.setContent(`
    <button>Hi</button>
    <button aria-expanded="true">Hello</button>
    <button aria-expanded="false">Bye</button>
  `);
  expect(await page.locator(`role=button[expanded]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button aria-expanded="true">Hello</button>`,
  ]);
  expect(await page.locator(`role=button[expanded=true]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button aria-expanded="true">Hello</button>`,
  ]);
  expect(await page.getByRole('button', { expanded: true }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button aria-expanded="true">Hello</button>`,
  ]);
  expect(await page.locator(`role=button[expanded=false]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button aria-expanded="false">Bye</button>`,
  ]);
  expect(await page.getByRole('button', { expanded: false }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button aria-expanded="false">Bye</button>`,
  ]);
});

test('should support disabled', async ({ page }) => {
  await page.setContent(`
    <button>Hi</button>
    <button disabled>Bye</button>
    <button aria-disabled="true">Hello</button>
    <button aria-disabled="false">Oh</button>
    <fieldset disabled>
      <button>Yay</button>
    </fieldset>
  `);
  expect(await page.locator(`role=button[disabled]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button disabled="">Bye</button>`,
    `<button aria-disabled="true">Hello</button>`,
    `<button>Yay</button>`,
  ]);
  expect(await page.locator(`role=button[disabled=true]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button disabled="">Bye</button>`,
    `<button aria-disabled="true">Hello</button>`,
    `<button>Yay</button>`,
  ]);
  expect(await page.getByRole('button', { disabled: true }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button disabled="">Bye</button>`,
    `<button aria-disabled="true">Hello</button>`,
    `<button>Yay</button>`,
  ]);
  expect(await page.locator(`role=button[disabled=false]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button aria-disabled="false">Oh</button>`,
  ]);
  expect(await page.getByRole('button', { disabled: false }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button aria-disabled="false">Oh</button>`,
  ]);
});

test('should support level', async ({ page }) => {
  await page.setContent(`
    <h1>Hello</h1>
    <h3>Hi</h3>
    <div role="heading" aria-level="5">Bye</div>
  `);
  expect(await page.locator(`role=heading[level=1]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<h1>Hello</h1>`,
  ]);
  expect(await page.getByRole('heading', { level: 1 }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<h1>Hello</h1>`,
  ]);
  expect(await page.locator(`role=heading[level=3]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<h3>Hi</h3>`,
  ]);
  expect(await page.getByRole('heading', { level: 3 }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<h3>Hi</h3>`,
  ]);
  expect(await page.locator(`role=heading[level=5]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="heading" aria-level="5">Bye</div>`,
  ]);
});

test('should filter hidden, unless explicitly asked for', async ({ page }) => {
  await page.setContent(`
    <button>Hi</button>
    <button hidden>Hello</button>
    <button aria-hidden="true">Yay</button>
    <button aria-hidden="false">Nay</button>
    <button style="visibility:hidden">Bye</button>
    <div style="visibility:hidden">
      <button>Oh</button>
    </div>
    <div style="visibility:hidden">
      <button style="visibility:visible">Still here</button>
    </div>
    <button style="display:none">Never</button>
    <div id=host1></div>
    <div id=host2 style="display:none"></div>
    <script>
      function addButton(host, text) {
        const root = host.attachShadow({ mode: 'open' });
        const button = document.createElement('button');
        button.textContent = text;
        root.appendChild(button);
      }
      addButton(document.getElementById('host1'), 'Shadow1');
      addButton(document.getElementById('host2'), 'Shadow2');
    </script>
  `);
  expect(await page.locator(`role=button`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button aria-hidden="false">Nay</button>`,
    `<button style="visibility:visible">Still here</button>`,
    `<button>Shadow1</button>`,
  ]);
  expect(await page.locator(`role=button[include-hidden]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button hidden="">Hello</button>`,
    `<button aria-hidden="true">Yay</button>`,
    `<button aria-hidden="false">Nay</button>`,
    `<button style="visibility:hidden">Bye</button>`,
    `<button>Oh</button>`,
    `<button style="visibility:visible">Still here</button>`,
    `<button style="display:none">Never</button>`,
    `<button>Shadow1</button>`,
    `<button>Shadow2</button>`,
  ]);
  expect(await page.locator(`role=button[include-hidden=true]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button hidden="">Hello</button>`,
    `<button aria-hidden="true">Yay</button>`,
    `<button aria-hidden="false">Nay</button>`,
    `<button style="visibility:hidden">Bye</button>`,
    `<button>Oh</button>`,
    `<button style="visibility:visible">Still here</button>`,
    `<button style="display:none">Never</button>`,
    `<button>Shadow1</button>`,
    `<button>Shadow2</button>`,
  ]);
  expect(await page.locator(`role=button[include-hidden=false]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<button>Hi</button>`,
    `<button aria-hidden="false">Nay</button>`,
    `<button style="visibility:visible">Still here</button>`,
    `<button>Shadow1</button>`,
  ]);
});

test('should support name', async ({ page }) => {
  await page.setContent(`
    <div role="button" aria-label="Hello"></div>
    <div role="button" aria-label="Hallo"></div>
    <div role="button" aria-label="Hello" aria-hidden="true"></div>
    <div role="button" aria-label="123" aria-hidden="true"></div>
    <div role="button" aria-label='foo"bar' aria-hidden="true"></div>
  `);
  expect(await page.locator(`role=button[name="Hello"]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="Hello"></div>`,
  ]);
  expect(await page.getByRole('button', { name: 'Hello' }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="Hello"></div>`,
  ]);

  expect(await page.locator(`role=button[name*="all"]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="Hallo"></div>`,
  ]);

  expect(await page.locator(`role=button[name=/^H[ae]llo$/]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="Hello"></div>`,
    `<div role="button" aria-label="Hallo"></div>`,
  ]);
  expect(await page.getByRole('button', { name: /^H[ae]llo$/ }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="Hello"></div>`,
    `<div role="button" aria-label="Hallo"></div>`,
  ]);

  expect(await page.locator(`role=button[name=/h.*o/i]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="Hello"></div>`,
    `<div role="button" aria-label="Hallo"></div>`,
  ]);
  expect(await page.getByRole('button', { name: /h.*o/i }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="Hello"></div>`,
    `<div role="button" aria-label="Hallo"></div>`,
  ]);

  expect(await page.locator(`role=button[name="Hello"][include-hidden]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="Hello"></div>`,
    `<div role="button" aria-label="Hello" aria-hidden="true"></div>`,
  ]);
  expect(await page.getByRole('button', { name: 'Hello', includeHidden: true }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="Hello"></div>`,
    `<div role="button" aria-label="Hello" aria-hidden="true"></div>`,
  ]);

  expect(await page.locator(`role=button[name=Hello]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="Hello"></div>`,
  ]);
  expect(await page.locator(`role=button[name=123][include-hidden]`).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="123" aria-hidden="true"></div>`,
  ]);
  expect(await page.getByRole('button', { name: '123', includeHidden: true }).evaluateAll(els => els.map(e => e.outerHTML))).toEqual([
    `<div role="button" aria-label="123" aria-hidden="true"></div>`,
  ]);
});

test('errors', async ({ page }) => {
  const e0 = await page.$('role=[bar]').catch(e => e);
  expect(e0.message).toContain(`Role must not be empty`);

  const e1 = await page.$('role=foo[sElected]').catch(e => e);
  expect(e1.message).toContain(`Unknown attribute "sElected", must be one of "checked", "disabled", "expanded", "include-hidden", "level", "name", "pressed", "selected"`);

  const e2 = await page.$('role=foo[bar . qux=true]').catch(e => e);
  expect(e2.message).toContain(`Unknown attribute "bar.qux"`);

  const e3 = await page.$('role=heading[level="bar"]').catch(e => e);
  expect(e3.message).toContain(`"level" attribute must be compared to a number`);

  const e4 = await page.$('role=checkbox[checked="bar"]').catch(e => e);
  expect(e4.message).toContain(`"checked" must be one of true, false, "mixed"`);

  const e5 = await page.$('role=checkbox[checked~=true]').catch(e => e);
  expect(e5.message).toContain(`cannot use ~= in attribute with non-string matching value`);

  const e6 = await page.$('role=button[level=3]').catch(e => e);
  expect(e6.message).toContain(`"level" attribute is only supported for roles: "heading", "listitem", "row", "treeitem"`);

  const e7 = await page.$('role=button[name]').catch(e => e);
  expect(e7.message).toContain(`"name" attribute must have a value`);
});