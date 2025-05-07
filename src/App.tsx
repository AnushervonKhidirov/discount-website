import { BrowserRouter, Route, Routes } from 'react-router';

import { Page } from '@constant/link.constant';

import HeaderLayout from '@layout/header/header.layout';
import BenefitPage from '@pages/benefit/benefit.page';
import LoginPage from '@pages/login/login.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Page.Login} element={<LoginPage />} />

        <Route element={<HeaderLayout />}>
          <Route path={Page.Home} element={<BenefitPage />} />
          <Route path={Page.Discount} element={<BenefitPage type="DISCOUNT" />} />
          <Route path={Page.Cashback} element={<BenefitPage type="CASHBACK" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
