import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { notification } from 'antd/es';
import { UserService } from '@service/user/user.service';
import { CookieService } from '@service/cookie/cookie.service';
import { useUserStore } from '@store/user.store';

import Header from '@component/common/header/header';
import Content from '@component/common/content/content';
import { requestWithRefresh } from '@helper/request.helper';

const HeaderLayout = () => {
  const [api, context] = notification.useNotification();
  const { setUser } = useUserStore();

  const cookieService = new CookieService();
  const userService = new UserService();

  const { accessToken } = cookieService.get<{ accessToken: string }>(['accessToken']);

  async function getUserInfo() {
    const [user, err] = await requestWithRefresh(() => userService.getMyInfo());
    if (err) return api.error({ message: err.error, description: err.message });
    setUser(user);
  }

  useEffect(() => {
    if (accessToken) getUserInfo();
  }, [accessToken]);

  return (
    <>
      {context}
      <Header />

      <main>
        <Content>
          <Outlet />
        </Content>
      </main>
    </>
  );
};

export default HeaderLayout;
