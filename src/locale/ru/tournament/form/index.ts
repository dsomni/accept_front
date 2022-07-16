import { steps } from './steps';

export const form = {
  steps,
  title: 'Название',
  description: 'Описание',
  allowRegistrationAfterStart: {
    title: 'Разрешить регистрацию после начала',
  },
  startDate: 'Дата начала',
  endDate: 'Дата завершения',
  freezeTableDate: 'Дата заморозки таблицы',
  shouldFreezeTable: 'Замораживать таблицу',
  admins: 'Модераторы',
  selectedAdmins: 'Выбранные модераторы',
  allowedLanguages: 'Разрешённые языки',
  deniedLanguages: 'Запрещённые языки',
  penalty: 'Штраф',
  assessmentType: {
    title: 'Тип оценивания',
    forTest: 'По тестовая оценка',
    forWhole: 'Оценка по полностью сданной задаче',
  },
};
