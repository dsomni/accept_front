import { IAssignmentSchema } from './IAssignmentSchema';
import { IGroup } from './IGroup';
import { IUser } from './IUser';

export interface IAssignment extends IAssignmentSchema {
  starter: IUser;
  isRunning: boolean;
  infinite: boolean;

  start?: Date;
  end?: Date;

  groups: IGroup[];
}
