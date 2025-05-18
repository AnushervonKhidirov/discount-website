import type { QueryObject } from '@type/query.type';

import dayjs from 'dayjs';

export function queryBuilder(options?: QueryObject): string {
  return options ? `?${queryObjectToArray(options).join('&')}` : '';
}

export function queryObjectToArray(options: QueryObject): string[] {
  const queries: string[] = [];

  for (const key in options) {
    if (typeof options[key] === 'undefined') continue;

    const value = queryValueTypeConverting(options[key]);
    if (value) queries.push(`${key}=${value}`);

    if (isQueryObject(options[key])) {
      queries.push(...queryObjectToArray(options[key]));
    }
  }

  return queries;
}

function queryValueTypeConverting(value: unknown) {
  let convertedValue: string | undefined;

  if (value instanceof Date) convertedValue = dayjs(value).format('DD-MM-YYYY');
  if (Array.isArray(value)) convertedValue = value.join(',');
  if (typeof value === 'string') convertedValue = value;
  if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'bigint') {
    convertedValue = `${value}`;
  }

  return convertedValue;
}

function isQueryObject(query: unknown): query is QueryObject {
  if (query && typeof query === 'object') return !!Object.keys(query).length;
  return false;
}
