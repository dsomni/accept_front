import {
  IAttemptStatus,
  IConstraints,
  IFullTestResult,
  ILanguage,
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
  programText: String;
  textAnswers: String[];
  date: Date;
  results: IFullTestResult[];
  verdict: ITestResultDisplay;
  task: ITaskBaseInfo;
  author: IUserDisplay;
}
