export const timer = {
  beforeStart: 'Before start',
  beforeEnd: 'Before end',
  years: (year: number): string =>
    year == 1 || year == -1 ? 'year' : 'years',
  months: (month: number): string =>
    month == 1 || month == -1 ? 'month' : 'months',
  days: (day: number): string =>
    day == 1 || day == -1 ? 'day' : 'days',
  hours: (hour: number) =>
    hour == 1 || hour == -1 ? 'hour' : 'hours',
  minutes: (minute: number) =>
    minute == 1 || minute == -1 ? 'minute' : 'minutes',
  seconds: (second: number) =>
    second == 1 || second == -1 ? 'second' : 'seconds',
};
