import {
  ITaskCheckType,
  ILanguage,
  ITaskType,
  ITest,
  IHintAlarmType,
  IVerdict,
} from './atomic';
import { ITag } from './ITag';
import { IUser } from './IUser';

export interface IHint {
  content: string;
  alarmType: IHintAlarmType; //  spec
  alarm: number;
  // depends on alarmType
  // "attempts" -> number of attempts required for hint to appear
  // "timestamp" -> timestamp when hint will appear
}

interface IChecker {
  sourceCode: string;
  language: string; // spec
}

interface IConstraints {
  time: number;
  memory: number;
}

export interface Example {
  inputData: string;
  outputData: string;
}

export interface ITaskDisplay {
  spec: string;
  title: string;
  tags: ITag[];
  author: IUser;
  verdict: IVerdict;
  insertedDate: Date;
  complexity: number;
}

export interface ITask extends ITaskDisplay {
  description: string;
  constraints: IConstraints;

  examples: Example[];
  inputFormat: string;
  outputFormat: string;
  remark: string | undefined;

  hint: IHint | undefined;

  allowedLanguages: ILanguage[];
  forbiddenLanguages: ILanguage[];
}

export interface ITaskEdit extends ITask {
  tests: ITest[];
  checker: IChecker | undefined;
  checkType: ITaskCheckType | undefined;
  taskType: ITaskType;
}
