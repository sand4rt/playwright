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

import { useLayoutEffect, useRef, useState } from 'react';

type CounterProps = {
  count?: number;
  onClick?(props: string): void;
  children?: any;
};

let _remountCount = 1;

export default function Counter(props: CounterProps) {
  const [remountCount] = useState(_remountCount);
  const didMountRef = useRef(false);
  useLayoutEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      _remountCount++;
    }
  }, []);
  return (
    <button onClick={() => props.onClick?.('hello')}>
      <span data-testid="props">{props.count}</span>
      <span data-testid="remount-count">{remountCount}</span>
      {props.children}
    </button>
  );
}
