import { IVerdict } from './atomic';
import { ITaskBaseInfo } from './ITask';
import { IUserDisplay } from './IUser';

export interface IResult {
  attempt: string;
  date: Date;
  verdict: IVerdict;
  verdictTest: number;
  passedTests: number;
  percentTests: number;
}

export interface ITableResults {
  results: IResult[];
  best?: IResult;
}

export interface IFullResults {
  tasks: ITaskBaseInfo[];
  users: IUserDisplay[];
  results: ITableResults[][];
}
