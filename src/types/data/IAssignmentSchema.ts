import { ITag } from './ITag';
import { ITaskDisplay } from './ITask';
import { IUser } from './IUser';

export interface IAssignmentSchema {
  spec: string;
  title: string;
  author: IUser;
  description: string;
  tasks: ITaskDisplay[];
  tags: ITag[];
  defaultDuration: number;
}

export interface IAssignmentSchemaDisplay {
  spec: string;
  title: string;
  author: IUser;
  taskNumber: number;
  tags: ITag[];
  defaultDuration: number;
}
