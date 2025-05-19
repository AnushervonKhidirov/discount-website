import { Outlet } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { notification } from 'antd/es';
import Content from '@common/content/content';
import Header from '@component/header/header';

import { UserService } from '@service/user/user.service';
import { CookieService } from '@service/cookie/cookie.service';
import { useUserStore } from '@store/user.store';
import { requestWithRefresh } from '@helper/request.helper';

const HeaderLayout = () => {
  const [_, context] = notification.useNotification();
  const { setUser } = useUserStore();
  const cookieService = new CookieService();
  const userService = new UserService();
  const { accessToken } = cookieService.get<{ accessToken: string }>(['accessToken']);

  const { isFetched } = useQuery({
    initialData: null,
    queryKey: ['userInfo'],
    queryFn: async () => {
      if (!accessToken) return null;
      const [user, err] = await requestWithRefresh(() => userService.getMyInfo());
      if (err) {
        notification.error({ message: err.error, description: err.message });
        return null;
      }

      setUser(user);
      return user;
    },
  });

  return (
    isFetched && (
      <>
        {context}
        <Header />

        <main>
          <Content fullHeight>
            <Outlet />
          </Content>
        </main>
      </>
    )
  );
};

export default HeaderLayout;
