const LETTERS =
  'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');
const ALPHABET_SIZE = LETTERS.length;

export const letterFromIndex = (index: number): string => {
  let resp = '';
  while (index >= 0) {
    resp = LETTERS[index % ALPHABET_SIZE] + resp;
    index = Math.floor(index / ALPHABET_SIZE) - 1;
  }
  return resp;
};
