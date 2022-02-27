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
  description: 'Описание',
  send: 'Отправка',
  results: 'Результаты',
  add: {
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
    isChecker: 'чекер',
    textType: 'текстовая задача',
    codeType: 'задача со сдачей кода',
    isCode: 'тип задачи',
    checker: 'чекер',
    tests: 'тесты',
    inputTest: 'входные данные',
    outputTest: 'выходные данные',
    test: 'тест',
    example: 'пример',
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
};

const placeholders = {
  code: 'вставьте ваш код сюда',
};

const ru = {
  accept: 'accept',
  loading: 'загрузка',
  placeholders,
  credentials,
  mainHeaderLinks,
  projects,
  date,
  months,
  auth,
  tasks,
  form,
};

export default ru;
