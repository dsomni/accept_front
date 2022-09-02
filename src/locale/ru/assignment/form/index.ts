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
  calendar: 'Выберете дату начала и окончания',
  status: {
    text: 'Статус',
    pending: 'Ожидается',
    running: 'В процессе',
    finished: 'Завершён',
  },
};
