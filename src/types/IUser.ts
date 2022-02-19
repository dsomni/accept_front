enum Roles {
  USER = 'user',
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}
export interface IUser {
  name: string;
  login: string;
  email: string | undefined;
  shortName: string | undefined;
  role: Roles;
  groups: string[];
  gradeNumber: number | undefined;
  gradeLetter: number | undefined;
  groupNumber: number | undefined;
}

export interface IUserContext {
  user: IUser | undefined;
  signIn: (login: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
