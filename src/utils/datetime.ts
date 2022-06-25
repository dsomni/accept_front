export const getLocalDate = (date: Date) => {
  return new Date(
    new Date(date).getTime() -
      new Date().getTimezoneOffset() * 60 * 1000
  ).toLocaleString();
};
