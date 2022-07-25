import {steps} from './steps';
import {validation} from './validation';

export const form = {
  steps,
  validation,
  title: 'Название',
  description: 'Описание',
  defaultDuration: 'Длительность по умолчанию (мин.)',
  taskOrdering: {
    title: 'Выберете порядок задач',
  },
  taskSelector: {
    available: 'Все задачи',
    used: 'Выбранные задачи',
  },
};
