import {
  IAttemptStatus,
  ILanguage,
  ITestResultDisplay,
} from './atomic';
import { ITaskBaseInfo } from './ITask';

export interface IAttemptDisplay {
  spec: string;
  language: ILanguage;
  status: IAttemptStatus;
  date: Date;
  verdict: ITestResultDisplay;
  task: ITaskBaseInfo;
  author: string;
}
