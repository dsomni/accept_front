const requestAccess = async <T>(
  url: string,
  pathname: string,
  headers: { Cookie: string } | undefined
): Promise<T | string> => {
  const response = await fetch(`${process.env.API_ENDPOINT}/${url}`, {
    method: 'GET',
    headers: headers,
  });

  if (response.status === 401) {
    return `/signin?referrer=${pathname}`;
  }
  if (response.status === 403) {
    return '/403';
  }
  if (response.status !== 200) return `/500`;

  return await response.json();
};

const SPEC = /\/[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}$/;

const getSpec = (pathname: string): string => {
  if (SPEC.test(pathname.toLowerCase())) {
    return pathname.slice(pathname.lastIndexOf('/'));
  }
  return '';
};

export const checkPermission = async (
  url: string,
  pathname: string,
  headers: { Cookie: string } | undefined,
  spec?: string
): Promise<boolean | string> => {
  if (spec)
    return await requestAccess(`${url}/${spec}`, pathname, headers);
  const pathSpec = getSpec(pathname);
  return await requestAccess(`${url}${pathSpec}`, pathname, headers);
};

export const checkAccess = async (
  pathname: string,
  headers: { Cookie: string } | undefined,
  access_level: number
): Promise<boolean | string> => {
  const response = await requestAccess<number>(
    'api/accessLevel',
    pathname,
    headers
  );

  if (typeof response === 'string') {
    return response;
  }

  if (response >= access_level) return true;
  return false;
};
