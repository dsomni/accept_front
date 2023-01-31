export const codeArea = {
  selectFiles: 'Выберите файлы',
  selectFile: 'Выберите файл',
  dragFiles: 'Перетащите файлы сюда',
  dragFile: 'Перетащите файл сюда',
  filesRestrictions: [
    'КРАЙНЕ желательно, чтобы длина каждого теста не превышала 100 000 символов, а размер - 200 Кб',
    'Также суммарный размер всех тестов не должен превышать 2 Мб',
    'В противном случае, сайт может зависнут',
  ],
  notification: {
    uploading: { title: 'Загружаем файл...', description: '' },
    reject: {
      title: 'Файл отклонён',
      description: 'Недопустимое расширение файла',
    },
    error: { title: 'Ошибка при загрузке файла', description: '' },
    success: { title: 'Файл загружен успешно', description: '' },
  },
};
