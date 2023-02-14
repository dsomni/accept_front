import { validation } from './validation';

export const form = {
  collection: 'Коллекция',
  action: 'Действие',
  query: 'Query',
  body: 'Body',
  params: 'Другие параметры',
  spec_field: 'Поле spec',

  helper: {
    spec_field: [
      'Только для действия "insert_many"',
      'Оставьте поле пустым, если не нужно генерировать уникальные идентификаторы для объектов',
      'Иначе укажите поле элемента, куда следует вставить уникальный идентификатор (например, spec)',
    ],
  },
  error: {
    parse: 'Ошибка при парсинге полей',
  },
  validation,
};
