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
  description: {
    self: 'description',
    format: {
      input: 'input format',
      output: 'output format',
    },
    examples: {
      title: 'examples',
      input: 'input data',
      output: 'output data',
    },
  },
  send: 'send',
  results: 'results',
  errors: {
    create: {
      error: 'can not create the task',
      success: 'task was successfully created',
    },
    edit: {
      error: 'can not edit the task',
      success: 'task was successfully updated',
    },
  },
  list: {
    title: 'title',
    author: 'author',
    grade: 'grade',
    verdict: 'verdict',
  },
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
    checkType: 'checker',
    textType: 'text task',
    codeType: 'code task',
    isCode: 'task type',
    checker: 'checker',
    hint: {
      title: 'hint',
      alarmType: 'alarm type',
      attempts: 'attempts',
      timestamp: 'timestamp',
      text: 'hint text',
      showAfter: 'show after',
    },
    remark: 'remark',
    tests: 'tests',
    inputTest: 'input',
    outputTest: 'output',
    test: 'test',
    example: 'example',
    tagSelector: {
      available: 'available tags',
      used: 'used tags',
      add: 'add tag',
      edit: 'edit tag',
      delete: 'delete tag',
      addPlaceholder: "enter tag's name",
      deleteConfidence:
        'are you sure you want to permanently delete the tag?',
    },
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
  search: 'search',
  update: 'update',
};

const credentials = {
  company: 'Blue Crane Inc.',
  startYear: '2020',
};

const placeholders = {
  code: 'place your code here',
  search: 'search',
  showColumns: 'pick columns to show',
};

const errors = {
  minLength: (title: string, len: number) =>
    `${title} should not be shorter than ${len} characters`,
};

const table = {
  perPage: 'per page',
};

const assignmentSchema = {
  errors: {
    create: {
      error: 'can not create the assignment schema',
      success: 'assignment schema was successfully created',
    },
  },
  form: {
    steps: {
      first: {
        label: 'first step',
        description: 'main assignment info',
      },
      second: {
        label: 'second step',
        description: 'tasks',
      },
      third: {
        label: 'third step',
        description: 'preview',
      },
    },
    title: 'title',
    description: 'description',
    defaultDuration: 'default duration',
  },
};

const en = {
  accept: 'accept',
  name: 'title',
  loading: 'loading',
  save: 'save',
  delete: 'delete',
  cancel: 'cancel',
  yes: 'yes',
  no: 'no',
  sure: "i'm sure",
  error: 'error',
  success: 'successes',
  language: 'language',
  all: 'all',
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

export default en;
