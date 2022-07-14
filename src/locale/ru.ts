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

const task = {
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
    validation: {
      title: 'Задача должна иметь название хотя бы из 5 символов',
      tags: 'Задача должна иметь хотя бы 1 тег ',
      description:
        'Задача должна иметь описание хотя бы из 20 символов',
      inputFormat: 'Задача должна иметь описание входных данных',
      outputFormat: 'Задача должна иметь описание выходных данных',
      grade: {
        least: 'Класс должен быть не меньше 1',
        most: 'Класс должен быть не больше 11',
      },
      examples: 'Задача должна содержать хотя бы 2 примера',
      tests: 'Задача должна иметь хотя бы 5 тестов',
      hintContent:
        'Вы добавили подсказку, но забыли добавить её содержание',
      checkerCode: 'Вы добавили чекер, но забыли ввести его код',
    },
    title: 'название',
    complexity: 'сложность',
    description: 'описание',
    inputFormat: 'входные данные',
    outputFormat: 'выходные данные',
    inputExample: 'пример входных данных',
    outputExample: 'пример выходных данных',
    grade: 'класс',
    checkTypes: ['тесты', 'чекер'],
    taskTypes: ['задача со сдачей кода', 'текстовая задача'],
    checkType: 'тип тестирования',
    taskType: 'тип задачи',
    checker: 'чекер',
    hint: {
      title: 'подсказка',
      alarmType: 'вид триггера',
      hintAlarmTypes: ['попытки', 'время'],
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
  errors: {
    unauthorized: 'вы не авторизованы',
  },
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

  attempt: {
    delete: {
      loading: 'удаляем попытку',
      success: 'попытка успешно удалён',
      error: 'ошибка при удалении попытки',
    },
    send: {
      loading: 'отправляем попытку',
      success: 'попытка успешно отправлена',
      error: 'ошибка при отправке попытки',
    },
  },

  task: {
    attempts: {
      list: {
        loading: '',
        success: '',
        error: 'ошибка при получении попыток',
      },
    },
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
  list: {
    title: 'название',
    author: 'автор',
    start: 'начало',
    end: 'окончание',
    status: 'статус',
  },
};

const attempts = {
  date: 'дата',
  language: 'язык',
  result: 'результат',
  verdict: 'вердикт',
  status: 'статус',
  statuses: ['в очереди', 'тестируется', 'протестирована'],
};

const codeArea = {
  selectFiles: 'выберете файлы',
  drag: 'перетащите файлы сюда',
  notification: {
    uploading: { title: 'загружаем файл...', description: '' },
    reject: {
      title: 'файл отклонён',
      description: 'недопустимое расширение файла',
    },
    error: { title: 'ошибка при загрузке файла', description: '' },
    success: { title: 'файл загружен успешно', description: '' },
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
  attempts,
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
  task,
  form,
  assignmentSchema,
  users,
  notify,
  errorPage,
  tournament,
  codeArea,
};

export default ru;
