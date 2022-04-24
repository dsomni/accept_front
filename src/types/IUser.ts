import { pureCallback } from './atomic';

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
  user: IUser | undefined | null;
  signIn: (login: string, password: string) => Promise<Boolean>;
  signOut: pureCallback<Promise<Boolean>>;
  refresh: pureCallback<Promise<void>>;
}

export interface IRegUser {
  login: string;
  name: string;
  password: string;
  email: string | null;
}
