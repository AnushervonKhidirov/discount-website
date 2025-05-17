import type { ReturnPromiseWithErr } from '@type/return-with-error.type';
import type { Token } from '@type/auth.type';

import { AuthService } from '@service/auth/auth.service';
import { CookieService } from '@service/cookie/cookie.service';
import { HttpError } from '@error/http.error';
import { returnError } from './response.helper';

export const requestWithRefresh = async <T>(
  request: () => ReturnPromiseWithErr<T>,
): ReturnPromiseWithErr<T> => {
  const authService = new AuthService();
  const cookieService = new CookieService();

  try {
    const [response, err] = await request();

    if (err) {
      if (err instanceof HttpError && err.statusCode === 401) {
        const { refreshToken } = cookieService.get<Token>(['refreshToken']);
        if (!refreshToken) {
          throw new HttpError({
            statusCode: 401,
            error: 'Unauthorized',
            message: 'Token not found',
          });
        }

        const [tokens, tokenErr] = await authService.refreshToken(refreshToken);
        if (tokenErr) throw tokenErr;
        cookieService.set(tokens);

        const [response, requestErr] = await request();
        if (requestErr) throw requestErr;
        return [response, null];
      }

      throw err;
    }

    return [response, null];
  } catch (err) {
    cookieService.delete(['accessToken', 'refreshToken']);
    return returnError(err);
  }
};
