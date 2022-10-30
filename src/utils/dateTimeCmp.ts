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
  Math.floor(date.getTime() / 1000 / 60 / 60 / 24) +
  (Math.floor(time.getTime() / 1000 / 60) % (24 * 60));
