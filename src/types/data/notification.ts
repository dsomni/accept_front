export interface INotification {
  spec: string;
  title: string;
  shortDescription: string;
  description: string;
  author: string;
  date: Date;
}

export interface INewNotification {
  spec: string;
  title: string;
  shortDescription: string;
  description: string;
  author: string;
  broadcast: boolean;
  logins: string[];
  groups: string[];
  roles: number[];
}

export interface INotificationRecord {
  login: string;
  notifications: INotification[];
  new_notifications: INotification[];
}
