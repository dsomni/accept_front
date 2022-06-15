import {
  FC,
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import {
  IAvailableLang,
  locales,
  ILocaleContext,
  ILocale,
} from '@custom-types/ui/ILocale';
import { useRouter } from 'next/router';
import { getCookie, setCookie } from '@utils/cookies';

const langList = Object.keys(locales) as IAvailableLang[];

const LocaleContext = createContext<ILocaleContext>(null!);

const defaultLocale = 'ru';

function getWeekDays(locale: ILocale) {
  return [
    locale.date.sunday,
    locale.date.monday,
    locale.date.tuesday,
    locale.date.wednesday,
    locale.date.thursday,
    locale.date.friday,
    locale.date.saturday,
  ];
}

function getMonths(locale: ILocale) {
  return [
    locale.months.january,
    locale.months.february,
    locale.months.march,
    locale.months.april,
    locale.months.may,
    locale.months.june,
    locale.months.july,
    locale.months.august,
    locale.months.september,
    locale.months.october,
    locale.months.november,
    locale.months.december,
  ];
}

export const LocaleProvider: FC = ({ children }) => {
  const set = useCallback((lang: IAvailableLang) => {
    setCookie('locale', lang);
    setLocale(lang);
    setValue((prev) => {
      return {
        ...prev,
        lang,
        locale: locales[lang],
        weekDays: getWeekDays(locales[lang]),
        months: getMonths(locales[lang]),
      };
    });
  }, []);
  const [locale, setLocale] = useState<IAvailableLang>(defaultLocale);
  useEffect(() => {
    const lang = getCookie('locale');
    if (lang) {
      set(lang as IAvailableLang);
    }
  }, []);
  const [value, setValue] = useState<ILocaleContext>(() => ({
    locale: locales[locale as IAvailableLang],
    set,
    lang: locale as IAvailableLang,
    langList,
    weekDays: getWeekDays(locales[locale as IAvailableLang]),
    months: getMonths(locales[locale as IAvailableLang]),
  }));

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export function useLocale() {
  return useContext(LocaleContext);
}
