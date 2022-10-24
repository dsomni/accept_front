export const removeOneElement = (arr: any[], item: any) => {
  const index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return [...arr];
};
