export const dateTimeCmp = (
  dateA: Date,
  timeA: Date,
  dateB: Date,
  timeB: Date
) => {
  const fullDateA = concatDateWithTime(dateA, timeA);
  const fullDateB = concatDateWithTime(dateB, timeB);

  return fullDateA == fullDateB ? 0 : fullDateA > fullDateB ? 1 : -1;
};

const concatDateWithTime = (date: Date, time: Date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    0,
    0
  ).getTime();
