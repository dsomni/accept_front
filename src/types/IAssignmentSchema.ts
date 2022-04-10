export interface IAssignmentSchema {
  spec: string;
  title: string;
  author: string;
  description: string;
  tasks: string[];
  tags: string[];
  defaultDuration: number;
}
