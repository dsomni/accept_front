import { pureCallback } from '../ui/atomic';
import { IGroup } from './IGroup';

export interface Role {
  spec: number;
  name: string;
  accessLevel: number;
}

export interface IUser {
  login: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string | undefined;
  shortName: string | undefined;
  groups: IGroup[];
  role: Role;
}

export interface IStudent extends IUser {
  gradeLetter: string;
  gradeNumber: number;
}

export interface IUserContext {
  user: IUser | undefined | null;
  accessLevel: number;
  isUser: boolean;
  isStudent: boolean;
  isTeacher: boolean;
  isAdmin: boolean;
  signIn: (login: string, password: string) => Promise<Boolean>;
  signOut: pureCallback<Promise<Boolean>>;
  refresh: pureCallback<Promise<void>>;
  refreshAccess: pureCallback<number>;
}

export interface IRegUser {
  login: string;
  name: string;
  password: string;
  email: string | null;
}
