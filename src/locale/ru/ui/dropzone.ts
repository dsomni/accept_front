export const dropzone = {
  errors: {
    'file-invalid-type': {
      title: 'Неверный тип файла',
      message: (filename: string) =>
        `Файл ${filename} имеет неверный тип`,
    },
    'file-too-large': {
      title: 'Файл слишком большой',
      message: (filename: string) =>
        `Файл ${filename} слишком большой`,
    },
    'file-too-small': {
      title: 'Файл слишком маленький',
      message: (filename: string) =>
        `Файл ${filename} слишком маленький`,
    },
    'too-many-files': {
      title: 'Слишком много файлов',
      message: (_: string) => `Слишком много файлов`,
    },
  },
};
