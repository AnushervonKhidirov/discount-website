import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter, Route, Routes } from 'react-router';

import { BenefitType } from '@type/benefit.type';
import HeaderLayout from '@layout/header/header.layout';
import BenefitPage from '@pages/benefit/benefit.page';
import LogInPage from '@pages/log-in/log-in.page';
import SignUpPage from '@pages/sign-up/sign-up.page';

import { Page } from '@constant/link.constant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path={Page.Home} element={<BenefitPage />} />
          <Route path={Page.Discount} element={<BenefitPage type={BenefitType.DISCOUNT} />} />
          <Route path={Page.Cashback} element={<BenefitPage type={BenefitType.CASHBACK} />} />
          <Route path={Page.PromoCode} element={<BenefitPage type={BenefitType.PROMO_CODE} />} />
        </Route>

        <Route path={Page.LogIn} element={<LogInPage />} />
        <Route path={Page.SignUp} element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
