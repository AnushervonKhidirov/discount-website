import type { LogInData, SignUpData, Token } from '@type/auth.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';
import type { HttpExceptionInstance } from '@type/common.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpException, returnError } from '@helper/response.helper';

export class AuthService {
  async signUp(body: SignUpData): ReturnPromiseWithErr<Token> {
    try {
      const { data: user } = await axios.post<Token | HttpExceptionInstance>(
        Endpoint.SignUp,
        body,
        {
          validateStatus: () => true,
        },
      );

      if (isHttpException(user)) throw new HttpError(user);

      return [user, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async signIn(body: LogInData): ReturnPromiseWithErr<Token> {
    try {
      const { data: user } = await axios.post<Token | HttpExceptionInstance>(
        Endpoint.SignIn,
        body,
        {
          validateStatus: () => true,
        },
      );

      if (isHttpException(user)) throw new HttpError(user);

      return [user, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async refreshToken(refreshToken: string): ReturnPromiseWithErr<Token> {
    try {
      const { data: token } = await axios.post<Token | HttpExceptionInstance>(
        Endpoint.RefreshToken,
        { refreshToken },
        {
          validateStatus: () => true,
        },
      );

      if (isHttpException(token)) throw new HttpError(token);

      return [token, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
