import { ReactNode } from 'react';

export interface IContact {
  icon: ReactNode;
  text: string;
  href?: string;
}

export interface IContactCard {
  title: string;
  description: string;
  contacts: IContact[];
}
