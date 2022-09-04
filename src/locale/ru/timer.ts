export const timer = {
  beforeStart: 'До начала',
  beforeEnd: 'До окончания',
  years: (year: number): string => {
    const absYear = Math.abs(year);
    return absYear == 1
      ? 'год'
      : absYear % 10 == 1 && absYear % 100 !== 11
      ? 'лет'
      : [2, 3, 4].includes(absYear % 10) &&
        ![12, 13, 14].includes(absYear % 100)
      ? 'года'
      : // : [0, 5, 6, 7, 8, 9].includes(amount % 10) ||
        //   [11, 12, 13, 14].includes(amount % 100)
        'лет';
  },
  months: (month: number): string => {
    const absMonth = Math.abs(month);
    return absMonth == 1
      ? 'месяц'
      : absMonth % 10 == 1 && absMonth % 100 !== 11
      ? 'месяцев'
      : [2, 3, 4].includes(absMonth % 10) &&
        ![12, 13, 14].includes(absMonth % 100)
      ? 'месяца'
      : // : [0, 5, 6, 7, 8, 9].includes(amount % 10) ||
        //   [11, 12, 13, 14].includes(amount % 100)
        'месяцев';
  },
  days: (day: number): string => {
    const absDay = Math.abs(day);
    return absDay == 1
      ? 'день'
      : absDay % 10 == 1 && absDay % 100 != 11
      ? 'день'
      : [2, 3, 4].includes(absDay % 10) &&
        ![12, 13, 14].includes(absDay % 100)
      ? 'дня'
      : // : [0, 5, 6, 7, 8, 9].includes(amount % 10) ||
        //   [11, 12, 13, 14].includes(amount % 100)
        'дней';
  },

  hours: (hour: number): string => {
    const absHour = Math.abs(hour);
    return absHour == 1
      ? 'час'
      : absHour % 10 == 1 && absHour % 100 !== 11
      ? 'часов'
      : [2, 3, 4].includes(absHour % 10) &&
        ![12, 13, 14].includes(absHour % 100)
      ? 'часа'
      : // : [0, 5, 6, 7, 8, 9].includes(amount % 10) ||
        //   [11, 12, 13, 14].includes(amount % 100)
        'часов';
  },

  minutes: (minute: number): string => {
    const absMinute = Math.abs(minute);
    return absMinute == 1
      ? 'минута'
      : absMinute % 10 == 1 && absMinute % 100 !== 11
      ? 'минут'
      : [2, 3, 4].includes(absMinute % 10) &&
        ![12, 13, 14].includes(absMinute % 100)
      ? 'минуты'
      : // : [0, 5, 6, 7, 8, 9].includes(amount % 10) ||
        //   [11, 12, 13, 14].includes(amount % 100)
        'минут';
  },

  seconds: (second: number): string => {
    const absSecond = Math.abs(second);
    return absSecond == 1
      ? 'секунда'
      : absSecond % 10 == 1 && absSecond % 100 !== 11
      ? 'секунд'
      : [2, 3, 4].includes(absSecond % 10) &&
        ![12, 13, 14].includes(absSecond % 100)
      ? 'секунды'
      : // : [0, 5, 6, 7, 8, 9].includes(amount % 10) ||
        //   [11, 12, 13, 14].includes(amount % 100)
        'секунд';
  },
};
