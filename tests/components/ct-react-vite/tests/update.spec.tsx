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
import Counter from '@/components/Counter';
import DefaultChildren from '@/components/DefaultChildren';

test('update props without remounting', async ({ mount }) => {
  const component = await mount(<Counter count={9001} />);
  await expect(component.getByTestId('props')).toContainText('9001');

  await component.update(<Counter count={1337} />);
  await expect(component).not.toContainText('9001');
  await expect(component.getByTestId('props')).toContainText('1337');

  await expect(component.getByTestId('remount-count')).toContainText('1');
});

test('update child props without remounting', async ({ mount }) => {
  const component = await mount(
      <DefaultChildren>
        <Counter count={9001} />
      </DefaultChildren>
  );
  await expect(component.getByTestId('props')).toContainText('9001');

  await component.update(
      <DefaultChildren>
        <Counter count={1337} />
      </DefaultChildren>
  );
  await expect(component).not.toContainText('9001');
  await expect(component.getByTestId('props')).toContainText('1337');

  await expect(component.getByTestId('remount-count')).toContainText('1');
});

test('update callbacks without remounting', async ({ mount }) => {
  const component = await mount(<Counter />);

  const messages: string[] = [];
  await component.update(
      <Counter
        onClick={message => {
          messages.push(message);
        }}
      />
  );
  await component.click();
  expect(messages).toEqual(['hello']);

  await expect(component.getByTestId('remount-count')).toContainText('1');
});

test('update child callbacks without remounting', async ({ mount }) => {
  const component = await mount(<DefaultChildren><Counter /></DefaultChildren>);

  const messages: string[] = [];
  await component.update(
      <DefaultChildren>
        <Counter
          onClick={message => {
            messages.push(message);
          }}
        />
      </DefaultChildren>
  );
  await component.getByRole('button').click();
  expect(messages).toEqual(['hello']);

  await expect(component.getByTestId('remount-count')).toContainText('1');
});

test('update children without remounting', async ({ mount }) => {
  const component = await mount(<Counter>Default Slot</Counter>);
  await expect(component).toContainText('Default Slot');

  await component.update(<Counter>Test Slot</Counter>);
  await expect(component).not.toContainText('Default Slot');
  await expect(component).toContainText('Test Slot');

  await expect(component.getByTestId('remount-count')).toContainText('1');
});

test('update grandchild without remounting', async ({ mount }) => {
  const component = await mount(
      <DefaultChildren>
        <Counter>Default Slot</Counter>
      </DefaultChildren>
  );
  await expect(component.getByRole('button')).toContainText('Default Slot');

  await component.update(
      <DefaultChildren>
        <Counter>Test Slot</Counter>
      </DefaultChildren>
  );
  await expect(component.getByRole('button')).not.toContainText('Default Slot');
  await expect(component.getByRole('button')).toContainText('Test Slot');

  await expect(component.getByTestId('remount-count')).toContainText('1');
});
