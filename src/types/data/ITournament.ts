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
  tournament: ITournamentEdit;
  assessmentTypes: IAssessmentType[];
  tags: ITag[];
}

export interface ITournamentAdd
  extends Omit<
    ITournament,
    'tasks' | 'status' | 'tags' | 'participantsNumber'
  > {
  tasks: string[];
  tags: string[];
  status: number;

  participants: string[];

  moderators: string[];
  assessmentType: number;

  shouldPenalizeAttempt: boolean;
}

export interface ITournamentEdit
  extends Omit<ITournamentAdd, 'tasks'> {
  tasks: ITaskDisplay[];
}
