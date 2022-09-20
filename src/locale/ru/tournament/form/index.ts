import { steps } from './steps';

export const form = {
  steps,
  title: 'Название',
  description: 'Описание',
  allowRegistrationAfterStart: 'Регистрация после начала',
  shouldPenalizeAttempt: 'Штрафовать за попытки',
  assessmentType: {
    title: 'Тип оценивания',
    variants: [
      'Потестовая оценка',
      'Оценка по полностью сданной задаче',
    ],
  },

  calendar: 'Выберете дату начала и окончания',
  startDate: 'Дата начала',
  startTime: 'Время начала',
  endDate: 'Дата завершения',
  endTime: 'Время завершения',
  freezeTableDate: 'Дата заморозки таблицы',
  freezeTableTime: 'Время заморозки таблицы',

  moderators: 'Модераторы',
  selectedModerators: 'Выбранные модераторы',
  taskOrdering: 'Порядок задач',
  zeroTask: 'В турнире пока нет ни одной задачи',
};
