import { BrowserRouter, Route, Routes } from 'react-router';

import { Page } from '@constant/link.constant';

import HeaderLayout from '@layout/header/header.layout';
import HomePage from '@pages/home/home.page';
import LoginPage from '@pages/login/login.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Page.Login} element={<LoginPage />} />

        <Route element={<HeaderLayout />}>
          <Route path={Page.Home} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
