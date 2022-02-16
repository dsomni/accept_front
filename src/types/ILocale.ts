import en from '@locale/en';
import ru from '@locale/ru';

export const locales = {
  ru,
  en,
};

export interface ILocaleContext {
  locale: ILocale;
  lang: IAvailableLang;
  langList: IAvailableLang[];
  weekDays: string[];
  months: string[];
  set: (lang: IAvailableLang) => void;
}

export type IAvailableLang = keyof typeof locales;

export type ILocale = typeof ru;
export const defaultLocaleName = 'ru';
