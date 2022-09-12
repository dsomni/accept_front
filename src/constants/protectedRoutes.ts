export const accessLevels = {
  user: 0,
  student: 1,
  teacher: 3,
  admin: 50,
  developer: 100,
};

export const protectedRoutesInfo: { [key: string]: number } = {
  '/task/add': accessLevels.teacher,
  '/task/edit': accessLevels.teacher,
  '/task/tests': accessLevels.teacher,
  '/edu/assignment_schema/add': accessLevels.teacher,
  '/edu/assignment_schema/edit': accessLevels.teacher,
  '/edu/assignment/add': accessLevels.teacher,
  '/edu/assignment/edit': accessLevels.teacher,
};
