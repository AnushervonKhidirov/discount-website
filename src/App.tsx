import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter, Route, Routes } from 'react-router';

import { PromotionType } from '@type/promotion.type';
import HeaderLayout from '@layout/header/header.layout';
import PromotionPage from '@pages/promotion/promotion.page';
import LogInPage from '@pages/log-in/log-in.page';
import SignUpPage from '@pages/sign-up/sign-up.page';

import { Page } from '@constant/link.constant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path={Page.Promotion} element={<PromotionPage />} />
          <Route path={Page.Discount} element={<PromotionPage type={PromotionType.DISCOUNT} />} />
          <Route path={Page.Cashback} element={<PromotionPage type={PromotionType.CASHBACK} />} />
          <Route
            path={Page.PromoCode}
            element={<PromotionPage type={PromotionType.PROMO_CODE} />}
          />
        </Route>

        <Route path={Page.LogIn} element={<LogInPage />} />
        <Route path={Page.SignUp} element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
