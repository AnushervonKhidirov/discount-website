import type { ReturnWithErr } from '@type/return-with-error.type';
import type { HttpExceptionInstance } from '@type/common.type';

import { CustomError } from '@error/custom.error';
import { HttpError } from '@error/http.error';

export function isHttpException(data: object): data is HttpExceptionInstance {
  return (data as HttpError).statusCode >= 300;
}

export function returnError<T>(err: unknown): ReturnWithErr<T> {
  if (err instanceof HttpError) return [null, err];
  return [null, new CustomError('Error', 'Something went wrong, please try again later.')];
}
