export interface INotification {
  spec: string;
  title: string;
  shortDescription: string;
  description: string;
  author: string;
  date: Date;
  viewed: boolean;
  sent: boolean;
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
