export interface IChatMessage {
  spec: string;
  entity: string; // tournament`s or assignment`s spec
  host: string; // login of participant who initiated chat
  content: string;
  author: string;
  date: Date;
}
