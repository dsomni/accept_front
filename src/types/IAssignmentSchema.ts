export interface IAssignmentSchema {
  spec: string;
  title: string;
  author: string;
  description: string;
  tasks: string[];
  defaultDuration: number;
}
