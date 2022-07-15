import { steps } from "./steps"

export const form = {
    steps,
    title: 'название',
    description: 'описание',
    allowRegistrationAfterStart: {
      title: 'разрешить регистрацию после начала',
    },
    startDate: 'дата начала',
    endDate: 'дата завершения',
    freezeTableDate: 'дата заморозки таблицы',
    shouldFreezeTable: 'замораживать таблицу',
    admins: 'модераторы',
    selectedAdmins: 'выбранные модераторы',
    allowedLanguages: 'разрешённые языки',
    deniedLanguages: 'запрещённые языки',
    penalty: 'штраф',
    assessmentType: {
      title: 'тип оценивания',
      forTest: 'по тестовая оценка',
      forWhole: 'оценка по полностью сданной задаче',
    },
  }