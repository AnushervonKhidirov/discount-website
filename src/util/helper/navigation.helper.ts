export function getKeyFromUrl(url: string, pathLength?: number) {
  const fullPath = url.split('?')[0];

  if (pathLength) {
    const specificPathLength = fullPath
      .replaceAll('/', ' ')
      .trim()
      .split(' ')
      .splice(0, pathLength)
      .join('/');

    return `/${specificPathLength}`;
  }

  return fullPath;
}
