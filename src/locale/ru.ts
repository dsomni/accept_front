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

const pages = {
  tasks: {
    task: {
      description: 'Описание',
      send: 'Отправка',
      results: 'Результаты',
    },
    add: {
      steps: {
        first: {
          label: 'шаг первый',
          description: 'основная информация о задаче',
        },
        second: {
          label: 'шаг второй',
          description: 'тип задачи и примеры',
        },
        third: {
          label: 'шаг третий',
          description: 'тесты или чекер',
        },
        fourth: {
          label: 'шаг четвёртый',
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
    },
    status: {
      error: 'Ошибка при отправке',
      ok: 'Попытка успешно отправлена',
    },
    submit: 'Отправить',
  },
};

const ru = {
  accept: 'accept',
  mainHeaderLinks,
  projects,
  date,
  months,
  auth,
  pages,
};

export default ru;
