import { IHint } from './IHint';
import { ITest } from './ITest';

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

export interface IConstraints {
  time: number | undefined;
  memory: number | undefined;
}
