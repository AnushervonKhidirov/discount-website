import type { HttpExceptionInstance } from '@type/common.type';
import { CustomError } from './custom.error';

export class HttpError extends CustomError {
  statusCode: number;

  constructor({ statusCode, message, error }: HttpExceptionInstance) {
    const err = error ?? (Array.isArray(message) ? message[0] : message);
    const msg = error ? message : '';

    super(err, msg);
    this.statusCode = statusCode;
  }
}
