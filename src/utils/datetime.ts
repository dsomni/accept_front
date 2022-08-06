export const getLocalDate = (date: Date) => {
  return new Date(
    new Date(date).getTime() -
      new Date().getTimezoneOffset() * 60 * 1000
  ).toLocaleString();
};

export const concatDateTime = (date: Date, time: Date) => {
  date.setHours(0, 0, 0, 0);
  const justTime = time.getTime() % (24 * 60 * 60 * 1000);
  date.setTime(date.getTime() + justTime);
  return date;
};
