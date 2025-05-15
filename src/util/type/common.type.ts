import type { PropsWithChildren } from 'react';

export type AdditionalProps<T = unknown> = PropsWithChildren<T & { className?: string }>;

export type Cookie<T = unknown> = Partial<T> & { [key: string]: string };

export type LimitOptions = {
  take: number;
  skip: number;
};

export type FindOptions<T> = Partial<{ where: Partial<T> } & LimitOptions>;

export type HttpExceptionInstance = {
  statusCode: number;
  message: string | string[];
  error?: string;
};
