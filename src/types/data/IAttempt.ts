import {
  IAttemptStatus,
  ILanguage,
  ITestResultDisplay,
} from './atomic';

export interface IAttemptDisplay {
  spec: string;
  language: ILanguage;
  status: IAttemptStatus;
  date: Date;
  verdict: ITestResultDisplay;
}
