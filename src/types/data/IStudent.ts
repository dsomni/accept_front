export interface IStudentAdd {
  login: string;
  fullName: string;
  password: string;
  grade: string;
}

export interface IStudentAddResponse {
  login: string;
  fullName: string;
  grade: string;
  message: {
    kind: 'warning' | 'error';
    text: any;
  };
}
