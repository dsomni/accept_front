import { IUser } from './IUser';

export interface IGroup {
  spec: string;
  name: string;
}

export interface IGroupEditBundle {
  group: IGroup;
  users: IUser[];
}
