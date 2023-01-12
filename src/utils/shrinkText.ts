export const shrinkText = (
  text: string,
  length: number,
  end: string = '...'
) => {
  return text.length > length
    ? text.slice(0, length - end.length) + end
    : text;
};
