export const capitalize = (word: string): string => {
  if (word && word.length) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return '';
};
