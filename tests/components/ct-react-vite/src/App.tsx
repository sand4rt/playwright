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

import { Routes, Route, Link } from 'react-router-dom';
import logo from './assets/logo.svg';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App({ title }: { title?: string }) {
  return (
    <>
      <header>
        <img src={logo} alt="logo" width={125} height={125} />
        {title && <h1>{title}</h1>}
        <Link to="/">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </header>
      <Routes>
        <Route path="/">
          <Route index element={<LoginPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  );
}
