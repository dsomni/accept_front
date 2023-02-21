import { ReactNode } from 'react';

export interface IContact {
  icon: ReactNode;
  // eslint-disable-next-line unused-imports/no-unused-vars
  text: (shrink: boolean) => string;
  href?: string;
}

export interface IContactCard {
  title: string;
  description: string;
  contacts: IContact[];
}
