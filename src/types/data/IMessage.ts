import { IUserDisplay } from './IUser';

export interface IMessage {
  user: IUserDisplay;
  content: string;
  date: Date;
}
