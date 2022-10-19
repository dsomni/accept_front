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
    __: { Cookie: string } | undefined
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
  '/task/add': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/task/edit': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/task/tests': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/user/list': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/group/list': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.teacher),
  '/dashboard/admin': (pathname, headers) =>
    checkAccess(pathname, headers, accessLevels.admin),
};
