export const tagSelector = {
  minLength: (title: string, len: number) =>
    `${title} должен быть не короче ${len} символов`,
  available: 'Все теги',
  used: 'Выбранные теги',
  edit: 'Редактировать тег',
  add: 'Добавить тег',
  delete: 'Удалить тег',
  addPlaceholder: 'Введите название тега',
  deleteConfidence:
    'Вы уверены, что хотите безвозвратно удалить этот тег?',
};
