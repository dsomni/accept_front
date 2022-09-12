export const accessLevels = {
  user: 1,
  student: 2,
  teacher: 3,
  admin: 50,
  developer: 100,
};

export const protectedRoutesInfo: { [key: string]: number } = {
  '/dashboard/assignment': accessLevels.teacher,
  '/edu/assignment_schema/add': accessLevels.teacher,
  '/edu/assignment_schema/edit': accessLevels.teacher,
  '/edu/assignment_schema/list': accessLevels.teacher,
  '/edu/assignment_schema': accessLevels.teacher,
  '/edu/assignment': accessLevels.user,
  '/edu/assignment/add': accessLevels.teacher,
  '/edu/assignment/edit': accessLevels.teacher,
  '/group/add': accessLevels.teacher,
  '/group/edit': accessLevels.teacher,
  '/notification/add': accessLevels.teacher,
  '/task/add': accessLevels.teacher,
  '/task/edit': accessLevels.teacher,
  '/task/tests': accessLevels.teacher,
  '/user/list': accessLevels.teacher,
  '/group/list': accessLevels.teacher,
};
