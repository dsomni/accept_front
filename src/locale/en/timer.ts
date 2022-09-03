export const timer = {
  beforeStart: 'Before start',
  beforeEnd: 'Before end',
  years: (year: number): string => (year == 1 ? 'year' : 'years'),
  months: (month: number): string =>
    month == 1 ? 'month' : 'months',
  days: (day: number): string => (day == 1 ? 'day' : 'days'),
};
