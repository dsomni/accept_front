export const timer = {
  beforeStart: 'До начала',
  beforeEnd: 'До окончания',
  years: (year: number): string =>
    year == 1
      ? 'год'
      : year % 10 == 1 && year % 100 == 11
      ? `лет`
      : [2, 3, 4].includes(year % 10) &&
        ![12, 13, 14].includes(year % 100)
      ? `года`
      : // : [0, 5, 6, 7, 8, 9].includes(amount % 10) ||
        //   [11, 12, 13, 14].includes(amount % 100)
        `лет`,
  months: (month: number): string =>
    month == 1
      ? 'месяц'
      : month % 10 == 1 && month % 100 == 11
      ? `месяцев`
      : [2, 3, 4].includes(month % 10) &&
        ![12, 13, 14].includes(month % 100)
      ? `месяца`
      : // : [0, 5, 6, 7, 8, 9].includes(amount % 10) ||
        //   [11, 12, 13, 14].includes(amount % 100)
        `месяцев`,
  days: (day: number): string =>
    day == 1
      ? 'день'
      : day % 10 == 1 && day % 100 == 11
      ? `дней`
      : [2, 3, 4].includes(day % 10) &&
        ![12, 13, 14].includes(day % 100)
      ? `дня`
      : // : [0, 5, 6, 7, 8, 9].includes(amount % 10) ||
        //   [11, 12, 13, 14].includes(amount % 100)
        `дней`,
};
