export enum IAssessmentType {
  FOR_TEST = '0',
  FOR_WHOLE = '1',
}

export enum ITournamentStatus {
  PENDING = '0',
  RUNNING = '1',
  FINISHED = '2',
}

export interface ITournamentCreate {
  author: string; // creator login
  title: string;
  description: string;

  start: number; // date timestamp
  end: number; // date timestamp
  freezeTable?: number; // timestamp when to freeze the table
  allowRegistrationAfterStart: boolean;
  admins: string[]; // logins

  penalty: number; // for attempt
  assessmentType: IAssessmentType;
  allowedLanguages: string[];
  deniedLanguages: string[];
}

export interface ITournament extends ITournamentCreate {
  spec: string;
  frozenTable: string; // table spec
  resultTable: string; // table spec
  participants: string[]; // logins
  tasks: string[]; // task specs
}

export interface ITournamentList {
  spec: string;
  title: string;
  author: string;
  status: ITournamentStatus;
  start: number; // date timestamp
  end: number; // date timestamp
}
