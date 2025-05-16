import type { SignUpData } from '@type/auth.type';

import { useNavigate } from 'react-router';
import { Form, Input, notification } from 'antd/es';
import { FormCard } from '@common/form-card/form-card';

import { AuthService } from '@service/auth/auth.service';
import { CookieService } from '@service/cookie/cookie.service';
import { Page } from '@constant/link.constant';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [api, context] = notification.useNotification();

  const authService = new AuthService();
  const cookieService = new CookieService();

  const onSubmit = async (values: SignUpData) => {
    if (values.password !== values.repeat_password) {
      return api.error({
        message: 'Wrong repeat password',
        description: 'Repeat password should match password!',
      });
    }

    const [token, err] = await authService.signUp(values);

    if (err) return api.error({ message: err.error, description: err.message });

    cookieService.set(token);
    navigate(Page.Promotion);
  };

  return (
    <main>
      {context}
      <FormCard title="Sign in" onSubmit={onSubmit}>
        <Form.Item
          name="username"
          label={null}
          rules={[{ required: true, message: 'Username is required' }]}
        >
          <Input placeholder="Username" name="username" />
        </Form.Item>

        <Form.Item
          name="password"
          label={null}
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="repeat_password"
          label={null}
          rules={[{ required: true, message: 'Repeat password is required' }]}
        >
          <Input.Password placeholder="Repeat password" />
        </Form.Item>
      </FormCard>
    </main>
  );
};

export default SignUpPage;
