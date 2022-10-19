import { validation } from './validation';
import { steps } from './steps';

export const form = {
  steps,
  validation,
  infinite: 'Бесконечный',
  starter: 'Учитель',
  author: 'Автор',
  startTime: 'Время начала',
  endTime: 'Время окончания',
  frozeTime: 'Время заморозки таблицы',
  calendar: 'Выберете дату начала и окончания',
  status: {
    text: 'Статус',
    0: 'Ожидается',
    1: 'В процессе',
    2: 'Завершён',
  },
};
