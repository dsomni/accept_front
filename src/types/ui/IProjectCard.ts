import { ILocale } from './ILocale';

export interface IProjectCard {
  title: (locale: ILocale) => string;
  description: (locale: ILocale) => string;
  image: string;
  href: string;
}
