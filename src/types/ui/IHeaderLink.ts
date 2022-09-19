import { accessLevels } from '@constants/protectedRoutes';
import { ILocale } from './ILocale';

export default interface IHeaderLink {
  text: (_: ILocale) => string;
  type: 'dropdown' | 'regular';
  links?: IHeaderLink[];
  href: string;
  permission?: keyof typeof accessLevels;
}
