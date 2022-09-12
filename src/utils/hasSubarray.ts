export const hasSubarray = (arr: any[], subArray: any[]) => {
  for (let i = 0; i < subArray.length; i++) {
    if (!arr.includes(subArray[i])) {
      return false;
    }
  }
  return true;
};
