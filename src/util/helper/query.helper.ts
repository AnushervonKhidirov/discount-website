/* eslint-disable @typescript-eslint/no-explicit-any */
export function queryBuilder(options: any): string {
  return `?${queryObjectToArray(options).join('&')}`;
}

export function queryObjectToArray(options: any): string[] {
  const queries: string[] = [];

  if (options) {
    const opt: any = options;

    for (const key in opt) {
      if (typeof opt[key] === 'undefined') continue;

      if (typeof opt[key] !== 'object') {
        queries.push(`${key}=${opt[key]}`);
      } else {
        queries.push(...queryObjectToArray(opt[key]))
      }
    }
  }

  return queries;
}
