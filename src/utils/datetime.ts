import { ILocale } from '@custom-types/ui/ILocale';

export const getLocalDate = (date: Date) => {
  return timezoneDate(new Date(date)).toLocaleString();
};

export const concatDateTime = (date: Date, time: Date) => {
  date.setHours(0, 0, 0, 0);
  const justTime = time.getTime() % (24 * 60 * 60 * 1000);
  date.setTime(date.getTime() + justTime);
  return date;
};

export const timezoneDate = (date: Date) => {
  return new Date(
    date.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  );
};

export const UTCDate = (date: Date) => {
  return new Date(
    date.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  );
};

const addFrontZero = (number: number) =>
  number > 9 ? number.toString() : '0' + number;

const getLabeledTime = (time: number) => ({
  seconds: addFrontZero(Math.floor(time / 1000) % 60),
  minutes: addFrontZero(Math.floor(time / 1000 / 60) % 60),
  hours: addFrontZero(Math.floor(time / 1000 / 60 / 60) % 24),
  days: Math.floor(time / 1000 / 60 / 60 / 24) % 30,
  months: Math.floor(time / 1000 / 60 / 60 / 24 / 30) % 12,
  years: Math.floor(time / 1000 / 60 / 60 / 24 / 30 / 12),
});

export const timerDate = (time: number, locale: ILocale): string => {
  const date = getLabeledTime(time);
  return `${
    date.years
      ? `${date.years} ${locale.timer.years(date.years)} `
      : ''
  }${
    date.months
      ? `${date.months} ${locale.timer.months(date.months)} ` + ' '
      : ''
  }${
    date.days
      ? `${date.days} ${locale.timer.days(date.days)} ` + ' '
      : ''
  }${date.hours}:${date.minutes}:${date.seconds}`;
};
