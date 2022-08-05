import {
  IAssignmentSchema,
  IAssignmentSchemaDisplay,
} from './IAssignmentSchema';
import { IAssignmentStatus } from './atomic';
import { IGroup } from './IGroup';
import { IUser } from './IUser';

export interface IAssignment extends IAssignmentSchema {
  starter: IUser;
  status: IAssignmentStatus;
  infinite: boolean;

  start?: Date;
  end?: Date;

  groups: IGroup[];
}

export interface IAssignmentAddBundle {
  assignment_schemas: IAssignmentSchemaDisplay[];
  groups: IGroup[];
}

export interface IAssignmentEditBundle {
  assignment_schemas: IAssignmentSchemaDisplay[];
  groups: IGroup[];
  assignment: IAssignment;
}
