import { ILocale } from './ILocale';

export default interface IHeaderLink {
  text: (locale: ILocale) => string;
  href: string;
  current: (current: string) => boolean;
}
