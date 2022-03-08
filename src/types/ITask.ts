import { IHint } from './IHint';
import { ITest } from './ITest';

interface IChecker {
  sourceCode: string;
  language: string;
  version: string | undefined;
}

interface IConstraints {
  time: number | undefined;
  memory: number | undefined;
}

export interface ITaskDisplay {
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

  lastUpdate: number;
  lastRender: number;

  tests: ITest[];
  checker: IChecker | undefined;
}

export interface ITaskList {
  title: string;
  tags: string[];
  author: string;
  verdict: string | undefined;
}
