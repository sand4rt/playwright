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

import type {
  TestType,
  PlaywrightTestArgs,
  PlaywrightTestConfig as BasePlaywrightTestConfig,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  Locator,
} from '@playwright/test';
import type { InlineConfig } from 'vite';

export type PlaywrightTestConfig = Omit<BasePlaywrightTestConfig, 'use'> & {
  use?: BasePlaywrightTestConfig['use'] & {
    ctPort?: number,
    ctTemplateDir?: string,
    ctCacheDir?: string,
    ctViteConfig?: InlineConfig
  }
};

export interface MountOptions<Props = Record<string, unknown>> {
  props?: Props,
  slots?: Record<string, unknown>,
  on?: Record<string, Function>,
  hooksConfig?: any,
}

interface MountResult extends Locator {
  unmount(): Promise<void>;
}

interface ComponentFixtures {
  mount(component: any, options?: MountOptions): Promise<MountResult>;
  mount<Props>(component: any, options: MountOptions<Required<Props>>): Promise<MountResult>;
}

export const test: TestType<
  PlaywrightTestArgs & PlaywrightTestOptions & ComponentFixtures,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions>;

export { expect, devices } from '@playwright/test';