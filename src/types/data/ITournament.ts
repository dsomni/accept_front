import { IAssessmentType } from './atomic';
import { ITag } from './ITag';

export interface ITournament {}

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
  tasks: string[];

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
