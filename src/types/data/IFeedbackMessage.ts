export const feedbackSubjects = [
  'bug',
  'feature',
  'report',
  'other',
] as const;
export type IFeedbackSubject = typeof feedbackSubjects[number];

export interface IFeedbackMessage {
  spec: string;
  author: string;
  subject: IFeedbackSubject;
  message: string;
  reviewed: boolean;
  date: Date;
}
