import {
  IAssignmentSchema,
  IAssignmentSchemaDisplay,
} from './IAssignmentSchema';
import { IAssignmentStatus } from './atomic';
import { IGroup } from './IGroup';
import { IAttemptDisplay } from './IAttempt';
export interface IAssignment extends IAssignmentSchema {
  starter: string;
  status: IAssignmentStatus;
  infinite: boolean;

  start: Date;
  end: Date;

  groups: IGroup[];
}

export interface IAssignmentAdd {
  spec: string;
  origin: string;
  starter: string;
  status: number;
  infinite: boolean;

  start: Date;
  end: Date;

  groups: string[];
}
export interface IAssignmentSubmit {
  spec: string;
  origin: string;
  starter: string;
  status: number;
  infinite: boolean;

  start: string;
  end: string;

  groups: string[];
}

export interface IAssignmentAddBundle {
  assignment_schemas: IAssignmentSchemaDisplay[];
  groups: IGroup[];
}

export interface IAssignmentEditBundle {
  assignment_schemas: IAssignmentSchemaDisplay[];
  groups: IGroup[];
  assignment: IAssignmentAdd;
}

export interface IAssignmentResults {
  tasks: { spec: string; title: string }[];
  users: { login: string; shortName: string }[];
  results: {
    best: IAttemptDisplay | null;
    attempts: IAttemptDisplay[];
  }[][];
}
