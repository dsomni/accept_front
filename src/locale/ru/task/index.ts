import { modals } from './modals';
import { description } from './description';
import { list } from './list';
import { form } from './form';

export const task = {
  send: 'Отправка',
  answer: 'Ответ',
  results: 'Результаты',
  description,

  submit: 'Отправить',
  status: {
    error: 'Ошибка при отправке',
    ok: 'Попытка успешно отправлена',
  },
  constraints: {
    time: 'Время',
    memory: 'Память',
  },
  complexity: 'Сложность',

  modals,
  list,
  form,
};
