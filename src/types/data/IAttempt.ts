import {
  IAttemptStatus,
  IConstraints,
  ILanguage,
  IPartialTestResult,
  ITestResultDisplay,
} from './atomic';
import { ITaskBaseInfo } from './ITask';
import { IUserDisplay } from './IUser';

export interface IAttemptDisplay {
  spec: string;
  language: ILanguage;
  status: IAttemptStatus;
  date: Date;
  verdict: ITestResultDisplay;
  task: ITaskBaseInfo;
  author: string;
}

export interface IAttempt {
  spec: string;
  language: ILanguage;
  status: IAttemptStatus;
  constraints?: IConstraints;
  programText: string;
  textAnswers: string[];
  date: Date;
  results: IPartialTestResult[];
  verdict: ITestResultDisplay;
  task: ITaskBaseInfo;
  author: IUserDisplay;
}
