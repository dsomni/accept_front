export interface IAttemptStatus {
  spec: number;
  name: string;
}
export interface IVerdict {
  spec: number;
  fullText: string;
  shortText: string;
}
export interface ITest {
  spec: string;
  inputData: string;
  outputData: string;
}
export interface ITestResult {
  test: string; //test spec
  verdict: IVerdict;
}

export interface ILanguage {
  spec: number;
  name: string;
  shortName: string;
  extensions: string[];
}
export interface ICheckType {
  // "tests" or "checker"
  spec: number;
  name: string;
}
export interface ITaskType {
  // "code" or "text"
  spec: number;
  name: string;
}
export interface IAssessmentType {
  spec: number;
  name: string;
}
export interface ITournamentStatus {
  spec: number;
  name: string;
}
export interface IRole {
  // User < Student < Teacher < Admin
  spec: number;
  name: string;
  accessLevel: number;
}
