export interface ITaskDisplay {
  spec: string;
  title: string;
  author: string;
  description: string;
  grade: number | undefined;
  tags: string[];
  verdict: string | undefined;
}
