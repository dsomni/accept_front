import { checkAccess, checkPermission } from '@utils/checkAccess';

export const accessLevels = {
  user: 1,
  student: 2,
  teacher: 3,
  admin: 50,
  developer: 100,
};

const TOURNAMENT_URL = 'api/tournament-has-rights';

export const protectedRoutesInfo: {
  [key: string]: (
    _: string,
    __: { Cookie: string } | undefined,
    ___?: URLSearchParams
  ) => Promise<string | boolean>;
} = {
  '/dashboard/assignment': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/dashboard/tournament': (pathname, headers) =>
    checkPermission(TOURNAMENT_URL, pathname, headers),
  '/tournament': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.user),
  '/tournament/add': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/tournament/edit': (pathname, headers) =>
    checkPermission(TOURNAMENT_URL, pathname, headers),
  '/edu/assignment_schema/add': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/edu/assignment_schema/edit': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/edu/assignment_schema/list': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/edu/assignment_schema': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/edu/assignment': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.user),
  '/edu/assignment/add': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/edu/assignment/edit': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/group/add': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/group/edit': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/notification/add': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/task/add': (pathname, headers, searchParams) => {
    const query = searchParams?.get('tournament');
    if (!query)
      return checkAccess(pathname, headers, accessLevels.teacher);

    return checkPermission(TOURNAMENT_URL, pathname, headers, query);
  },
  '/task/edit': (pathname, headers, searchParams) => {
    const query = searchParams?.get('tournament');
    if (!query)
      return checkAccess(pathname, headers, accessLevels.teacher);

    return checkPermission(TOURNAMENT_URL, pathname, headers, query);
  },

  '/task/tests': (pathname, headers, searchParams) => {
    const query = searchParams?.get('tournament');
    if (!query)
      return checkAccess(pathname, headers, accessLevels.teacher);

    return checkPermission(TOURNAMENT_URL, pathname, headers, query);
  },
  '/user/list': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/group/list': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/dashboard/admin': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.admin),
  '/dashboard/developer': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.developer),
};
