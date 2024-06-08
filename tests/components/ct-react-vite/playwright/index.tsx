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

import { beforeMount, afterMount } from '@playwright/experimental-ct-react/hooks';
import { BrowserRouter } from 'react-router-dom';
import '../src/assets/index.css';

export type HooksConfig = {
  route?: string;
  routing?: boolean;
};

beforeMount<HooksConfig>(async ({ hooksConfig, App }) => {
  console.log(`Before mount: ${JSON.stringify(hooksConfig)}`);

  if (hooksConfig?.routing)
    return <BrowserRouter><App /></BrowserRouter>;
});

afterMount<HooksConfig>(async () => {
  console.log(`After mount`);
});
