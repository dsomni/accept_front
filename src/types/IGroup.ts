export interface IGroupDisplay {
  spec: string;
  title: string;
}

export interface IGroupToCreate {
  spec: string;
  title: string;
  members: string[];
}

export interface IGroup {
  spec: string;
  title: string;
  members: string[];
  assignments: string[];
  quizzes: string[];
}
