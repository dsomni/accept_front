const colors = [
  '#30c2b3',
  '#00aaaa',
  '#3083c2',
  '#ff00ff',
  '#8530c2',
  '#c230c0',
  '#c2308f',
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(int: number): string {
  return colors[int % colors.length];
}

export const colorGenerator = (string: string) =>
  intToRGB(hashCode(string));
