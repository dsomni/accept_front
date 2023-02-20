export const isJSON = (value: string) => {
  try {
    return JSON.parse(value) && !!value;
  } catch (e) {
    return false;
  }
};
