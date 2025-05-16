import '@ant-design/v5-patch-for-react-19';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import HeaderLayout from '@layout/header/header.layout';
import PromotionPage from '@pages/promotion/promotion.page';
import LogInPage from '@pages/log-in/log-in.page';
import SignUpPage from '@pages/sign-up/sign-up.page';

import { Page } from '@constant/link.constant';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route path={Page.Promotion + '/*'} element={<PromotionPage />} />
            <Route path={Page.Store + '/*'} element={<div>Store page</div>} />
          </Route>

          <Route path={Page.LogIn} element={<LogInPage />} />
          <Route path={Page.SignUp} element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
