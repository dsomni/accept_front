const mainHeaderLinks = {
  main: 'main',
  about: 'about',
  signin: 'signIn',
  signout: 'signOut',
  projects: 'projects',
};

const projects = {
  education: {
    title: 'education',
    description:
      'Make learning interesting and attractive! \
Come up with tasks, create lessons, conduct tests. \
One platform - many opportunities',
  },
  courses: {
    title: 'courses',
    description:
      'Participate in Tournaments or create your own. \
Flexible setup and a nice interface will help \
you will feel an unforgettable spirit of rivalry',
  },
  tournaments: {
    title: 'tournaments',
    description:
      'Learning something new is always interesting. \
The platform provides opportunities to create \
and take various courses. You can also consolidate the theory \
testing of practical skills',
  },
  view: 'view',
};

const auth = {
  submit: 'signIn',
  placeholders: {
    login: 'login',
    password: 'password',
  },
  labels: {
    login: 'login',
    password: 'password',
  },
  errors: {
    login: 'Login too short(min length 5)',
    password: 'Password too short(min length 5)',
  },
};

const date = {
  sunday: 'sunday',
  monday: 'monday',
  tuesday: 'tuesday',
  wednesday: 'wednesday',
  thursday: 'thursday',
  friday: 'friday',
  saturday: 'saturday',
};

const months = {
  january: 'january',
  february: 'february',
  march: 'march',
  april: 'april',
  may: 'may',
  june: 'june',
  july: 'july',
  august: 'august',
  september: 'september',
  october: 'october',
  november: 'november',
  december: 'december',
};

const tasks = {
  description: 'description',
  send: 'send',
  results: 'results',
  form: {
    steps: {
      first: {
        label: 'first step',
        description: 'main task info',
      },
      second: {
        label: 'second step',
        description: 'description',
      },
      third: {
        label: 'third step',
        description: 'task type and examples',
      },
      fourth: {
        label: 'fourth step',
        description: 'tests or checker',
      },
      fifth: {
        label: 'fifth step',
        description: 'preview',
      },
    },
    title: 'title',
    description: 'description',
    inputFormat: 'input description',
    outputFormat: 'output description',
    inputExample: 'input example',
    outputExample: 'output example',
    grade: 'grade',
    isChecker: 'checker',
    textType: 'text task',
    codeType: 'code task',
    isCode: 'task type',
    checker: 'checker',
    tests: 'tests',
    inputTest: 'input',
    outputTest: 'output',
    test: 'test',
    example: 'example',
  },
  status: {
    error: 'Error on task submit',
    ok: 'Attempt successfully submitted',
  },
  submit: 'submit',
};

const form = {
  next: 'next step',
  back: 'back',
  create: 'create',
};

const credentials = {
  company: 'Blue Crane Inc.',
  startYear: '2020',
};

const placeholders = {
  code: 'place your code here',
};

const en = {
  accept: 'accept',
  loading: 'loading',
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

export default en;
