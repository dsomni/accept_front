import { IAttemptStatus, ILanguage, ITestResult } from './atomic';

export interface IAttemptDisplay {
  spec: string;
  language: ILanguage;
  status: IAttemptStatus;
  date: Date;
  verdict: ITestResult;
}
