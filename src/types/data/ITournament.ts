import { IAssessmentType, ITournamentStatus } from './atomic';
import { ITag } from './ITag';
import { ITaskDisplay } from './ITask';

export interface ITournamentDisplay {
  spec: string;
  author: string;
  title: string;

  tags: ITag[];

  status: ITournamentStatus;

  start: Date;
  end: Date;
}

export interface ITournament {
  spec: string;
  author: string;
  title: string;
  description: string;
  tasks: ITaskDisplay[];

  tags: ITag[];

  status: ITournamentStatus;

  start: Date;
  end: Date;
  frozeResults: Date;

  participantsNumber: number;
  allowRegistrationAfterStart: boolean;
}

export interface ITournamentAddBundle {
  assessmentTypes: IAssessmentType[];
  tags: ITag[];
}

export interface ITournamentEditBundle {
  tournament: ITournamentAdd;
  assessmentTypes: IAssessmentType[];
  tags: ITag[];
}

export interface ITournamentAdd {
  spec: string;
  author: string;
  title: string;
  description: string;
  tasks: ITaskDisplay[];

  tags: string[];

  status: number;

  start: Date;
  end: Date;
  frozeResults: Date;

  participants: string[];

  moderators: string[];
  assessmentType: number;

  shouldPenalizeAttempt: boolean;
  allowRegistrationAfterStart: boolean;
}
