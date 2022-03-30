const mainHeaderLinks = {
  main: 'главная',
  about: 'о нас',
  signin: 'вход',
  signout: 'выход',
  projects: 'проекты',
};

const projects = {
  education: {
    title: 'образование',
    description:
      'Сделайте обучение интересным и привлекательным! \
      Придумывайте задачи, создавайте уроки, проводите контрольные. \
      Одна площадка - множество возможностей',
  },
  courses: {
    title: 'курсы',
    description:
      'Сделайте обучение интересным и привлекательным! \
   Придумывайте задачи, создавайте уроки, проводите контрольные. \
   Одна площадка - множество возможностей',
  },
  tournaments: {
    title: 'турниры',
    description:
      'Участвуйте в Турнирах или создавайте свои. \
      Гибкая настройка и приятный интерфейс помогут \
      вам прочувствовать незабываемый дух соперничества',
  },
  view: 'Попробовать',
};

const auth = {
  submit: 'войти',
  placeholders: {
    login: 'логин',
    password: 'пароль',
  },
  labels: {
    login: 'логин',
    password: 'пароль',
  },
  errors: {
    login: 'логин короче 5 символов',
    password: 'Пароль короче 5 символов',
  },
};

const date = {
  sunday: 'воскресенье',
  monday: 'понедельник',
  tuesday: 'вторник',
  wednesday: 'среда',
  thursday: 'четверг',
  friday: 'пятница',
  saturday: 'суббота',
};

const months = {
  january: 'января',
  february: 'февраля',
  march: 'марта',
  april: 'апреля',
  may: 'мая',
  june: 'июня',
  july: 'июля',
  august: 'августа',
  september: 'сентября',
  october: 'октября',
  november: 'ноября',
  december: 'декабря',
};

const tasks = {
  description: {
    self: 'описание',
    format: {
      input: 'входные данные',
      output: 'выходные данные',
    },
    examples: {
      title: 'примеры',
      input: 'входные данные',
      output: 'выходные данные',
    },
  },
  send: 'отправка',
  results: 'результаты',
  errors: {
    create: {
      error: 'ошибка при создании задачи',
      success: 'задача успешно создана',
    },
    edit: {
      error: 'ошибка при изменении задачи',
      success: 'задача успешно изменена',
    },
  },
  list: {
    title: 'название задачи',
    author: 'автор',
    grade: 'класс',
    verdict: 'вердикт',
  },
  form: {
    steps: {
      first: {
        label: 'шаг первый',
        description: 'основная информация о задаче',
      },
      second: {
        label: 'шаг второй',
        description: 'описание',
      },
      third: {
        label: 'шаг третий',
        description: 'тип задачи и примеры',
      },
      fourth: {
        label: 'шаг четвёртый',
        description: 'тесты или чекер',
      },
      fifth: {
        label: 'шаг пятый',
        description: 'предпросмотр',
      },
    },
    title: 'название',
    description: 'описание',
    inputFormat: 'входные данные',
    outputFormat: 'выходные данные',
    inputExample: 'пример входных данных',
    outputExample: 'пример выходных данных',
    grade: 'класс',
    checkType: 'чекер',
    textType: 'текстовая задача',
    codeType: 'задача со сдачей кода',
    isCode: 'тип задачи',
    checker: 'чекер',
    hint: {
      title: 'подсказка',
      alarmType: 'вид триггера',
      attempts: 'попытки',
      timestamp: 'время',
      text: 'текст подсказки',
      showAfter: 'показать после',
    },
    remark: 'примечание',
    tests: 'тесты',
    inputTest: 'входные данные',
    outputTest: 'выходные данные',
    test: 'тест',
    example: 'пример',
    tagSelector: {
      available: 'все теги',
      used: 'выбранные теги',
      edit: 'редактировать тег',
      add: 'добавить тег',
      delete: 'удалить тег',
      addPlaceholder: 'введите название тега',
      deleteConfidence:
        'вы уверены что хотите безвозвратно удалить этот тег?',
    },
  },
  status: {
    error: 'Ошибка при отправке',
    ok: 'Попытка успешно отправлена',
  },
  submit: 'Отправить',
};

const credentials = {
  company: 'Blue Crane Inc.',
  startYear: '2020',
};

const form = {
  next: 'следующий шаг',
  back: 'назад',
  create: 'создать',
  update: 'изменить',
  search: 'найти',
};

const placeholders = {
  code: 'вставьте ваш код сюда',
  search: 'поиск',
  showColumns: 'выберете поля',
};

const errors = {
  minLength: (title: string, len: number) =>
    `${title} должен быть не короче ${len} символов`,
};

const table = {
  perPage: 'на странице',
};

const assignmentSchema = {
  errors: {
    create: {
      error: 'ошибка при создании шаблона задания',
      success: 'шаблон задания успешно создан',
    },
  },
  form: {
    steps: {
      first: {
        label: 'шаг первый',
        description: 'основная информация',
      },
      second: {
        label: 'шаг второй',
        description: 'добавление задач',
      },
      third: {
        label: 'шаг третий',
        description: 'предпросмотр',
      },
    },
    title: 'название',
    description: 'описание',
    defaultDuration: 'длительность по умолчанию',
    taskSelector: {
      available: 'все задачи',
      used: 'выбранные задачи',
    },
  },
};

const ru = {
  accept: 'accept',
  loading: 'загрузка',
  name: 'название',
  save: 'сохранить',
  delete: 'удалить',
  cancel: 'отмена',
  yes: 'да',
  no: 'нет',
  sure: 'я уверен(а)',
  error: 'ошибка',
  success: 'успешно',
  language: 'язык',
  all: 'все',
  table,
  errors,
  placeholders,
  credentials,
  mainHeaderLinks,
  projects,
  date,
  months,
  auth,
  tasks,
  form,
  assignmentSchema,
};

export default ru;
