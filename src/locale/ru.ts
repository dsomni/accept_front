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
    name: 'Иванов Иван Иванович',
    email: 'example@example.com',
  },
  labels: {
    login: 'логин',
    password: 'пароль',
    name: 'ФИО',
    email: 'электронная почта',
  },
  errors: {
    login: 'логин короче 5 символов',
    password: 'Пароль короче 5 символов',
    name: 'имя слишком длинное',
    email: 'введите корректный e-mail',
  },
  stepper: {
    login: 'логин',
    password: 'пароль',
    final: 'дополнительно',
  },
  footer: {
    noAccount: 'ещё нет аккаунта?',
    hasAccount: 'уже есть аккаунт?',
    login: 'войти',
    register: 'зарегистрироваться',
    returnTo: 'вернуться на',
    mainPage: 'главную страницу',
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
  modals: {
    edit: 'редактировать задачу',
    add: 'добавить задачу',
    delete: 'удалить задачу',
    deleteConfidence:
      'вы уверены, что хотите безвозвратно удалить эту задачу?',
    usedInAssignments:
      'сейчас эта задача используется в следующих заданиях',
  },
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
        'вы уверены, что хотите безвозвратно удалить этот тег?',
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
  selectTags: 'выберете теги',
  selectGroups: 'выберете группы',
  title: 'введите название',
};

const errors = {
  minLength: (title: string, len: number) =>
    `${title} должен быть не короче ${len} символов`,
};

const table = {
  perPage: 'на странице',
  overall: 'всего',
};

const assignmentSchema = {
  modals: {
    edit: 'редактировать шаблон задания',
    add: 'добавить шаблон задания',
    delete: 'удалить шаблон задания',
    deleteConfidence:
      'вы уверены что хотите безвозвратно удалить шаблон этого задания?',
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
        description: 'порядок задач',
      },
      fourth: {
        label: 'шаг четвёртый',
        description: 'предпросмотр',
      },
    },
    title: 'название',
    description: 'описание',
    defaultDuration: 'длительность по умолчанию (мин.)',
    taskOrdering: {
      title: 'выберете порядок задач',
    },
    taskSelector: {
      available: 'все задачи',
      used: 'выбранные задачи',
    },
  },
  list: {
    title: 'название задания',
    author: 'автор',
    description: 'описание',
    taskCount: 'кол-во задач',
  },
};

const users = {
  list: {
    name: 'имя',
    login: 'логин',
    grade: 'класс',
  },
};

const groups = {
  add: 'добавить группу',
  title: 'название',
  students: 'ученики',
  selectedStudents: 'выбранные ученики',
};

const notify = {
  assignmentSchema: {
    create: {
      loading: 'создаём шаблон задания',
      success: 'шаблон задания успешно создан',
      error: 'ошибка при создании шаблона задания',
    },
    edit: {
      loading: 'обновляем шаблон задания',
      success: 'шаблон задания успешно обновлён',
      error: 'ошибка при обновлении шаблона задания',
    },
    delete: {
      loading: 'удаляем шаблон задания',
      success: 'шаблон задания успешно удалён',
      error: 'ошибка при удалении шаблона задания',
    },
  },
  task: {
    create: {
      loading: 'создаём задачу',
      success: 'задача успешно создана',
      error: 'ошибка при создании задачи',
    },
    edit: {
      loading: 'обновляем задачу',
      success: 'задача успешно обновлена',
      error: 'ошибка при обновлении задачи',
    },
    delete: {
      loading: 'удаляем задачу',
      success: 'задача успешно удалён',
      error: 'ошибка при удалении задачи',
    },
    send: {
      loading: 'отправляем задачу',
      success: 'задача успешно отправлена',
      error: 'ошибка при отправке задачи',
    },
  },
  group: {
    create: {
      loading: 'создаём группу',
      success: 'группа успешно создана',
      error: 'ошибка при создании группы',
    },
    edit: {
      loading: 'обновляем группу',
      success: 'группа успешно обновлена',
      error: 'ошибка при обновлении группы',
    },
    delete: {
      loading: 'удаляем группу',
      success: 'группа успешно удалён',
      error: 'ошибка при удалении группы',
    },
  },
  auth: {
    signIn: {
      loading: 'проверяем ваши данные',
      success: 'вход успешно выполнен',
      error: 'ошибка при попытке входа',
    },
    signUp: {
      loading: 'резервируем для вас местечко',
      success: 'вы успешно зарегистрированы',
      error: 'ошибка при попытке регистрации',
    },
    signOut: {
      loading:
        'производится всё необходимое для успешного выхода из учётной записи',
      success: 'выход успешно выполнен',
      error: 'ошибка при попытке выхода',
    },
  },
  tournament: {
    create: {
      loading: 'создаём турнир',
      success: 'турнир успешно создан',
      error: 'ошибка при создании турнира',
    },
    edit: {
      loading: 'обновляем турнир',
      success: 'турнир успешно обновлён',
      error: 'ошибка при обновлении турнира',
    },
    delete: {
      loading: 'удаляем турнир',
      success: 'турнир успешно удалён',
      error: 'ошибка при удалении турнира',
    },
  },
  tournament_task: {
    create: {
      loading: 'создаём турнирную задачу',
      success: 'турнирная задача успешно создана',
      error: 'ошибка при создании турнирной задачи',
    },
    edit: {
      loading: 'обновляем турнирную задачу',
      success: 'турнирная задача успешно обновлена',
      error: 'ошибка при обновлении турнирной задачи',
    },
    delete: {
      loading: 'удаляем турнирную задачу',
      success: 'турнирная задача успешно удалена',
      error: 'ошибка при удалении турнирной задачи',
    },
  },
};

const errorPage = {
  description: 'Упс... Страница где-то потерялась!',
  returnToMain: 'на главную',
};

const tournament = {
  form: {
    steps: {
      first: {
        label: 'шаг первый',
        description: 'основная информация',
      },
      second: {
        label: 'шаг второй',
        description: 'дополнительная информация',
      },
      third: {
        label: 'шаг третий',
        description: 'тип турнира',
      },
      fourth: {
        label: 'шаг четвёртый',
        description: 'предпросмотр',
      },
    },
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
  create: 'создать',
  edit: 'изменить',
  groups,
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
  users,
  notify,
  errorPage,
  tournament,
};

export default ru;
