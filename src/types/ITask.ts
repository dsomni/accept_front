import { IHint } from './IHint';
import { ITag } from './ITag';
import { ITest } from './ITest';
import { IUser } from './IUser';

interface IChecker {
  sourceCode: string;
  language: string;
  version: string | undefined;
}

interface IConstraints {
  time: number | undefined;
  memory: number | undefined;
}

export interface ITask {
  spec: string;
  title: string;
  description: string;
  author: string;
  grade: number | undefined;
  constraints: IConstraints | undefined;

  tags: string[];

  examples: ITest[];
  inputFormat: string;
  outputFormat: string;
  remark: string | undefined;

  hint: IHint | undefined;

  checkType: string;
  type: string;

  verdict: string | undefined;
}

export interface ITaskEdit {
  spec: string;
  title: string;
  description: string;
  author: string;
  grade: number | undefined;
  constraints: IConstraints | undefined;

  tags: string[];

  examples: ITest[];
  inputFormat: string;
  outputFormat: string;
  remark: string | undefined;

  hint: IHint | undefined;

  checkType: string;
  type: string;

  verdict: string | undefined;

  lastUpdate: number;
  lastRender: number;

  tests: ITest[];
  checker: IChecker | undefined;
  isTournament: boolean;
}

export interface ITaskDisplay {
  spec: string;
  title: string;
  tags: ITag[];
  author: IUser;
  verdict: undefined;
  insertedDate: Date;
}
