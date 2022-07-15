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
  submit: 'sign In',
  placeholders: {
    login: 'login',
    password: 'password',
    name: 'John Doe',
    email: 'example@example.com',
  },
  labels: {
    login: 'login',
    password: 'password',
    name: 'Full name',
    email: 'email',
  },
  errors: {
    login: 'login too short (min length 5)',
    password: 'password too short (min length 5)',
    name: 'name is too long',
    email: 'value should be valid e-mail',
  },
  stepper: {
    login: 'login',
    password: 'password',
    final: 'other information',
  },
  footer: {
    noAccount: 'still has no account?',
    hasAccount: 'already has account?',
    login: 'log in',
    register: 'sign up',
    returnTo: 'back to',
    mainPage: 'main page',
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

const task = {
  constraints: {
    time: 'time',
    memory: 'memory',
  },
  modals: {
    add: 'add task',
    edit: 'edit task',
    delete: 'delete task',
    deleteConfidence:
      'are you sure you want to permanently delete the task?',
    usedInAssignments:
      'this task is currently used in the following assignments',
  },
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
  list: {
    title: 'title',
    author: 'author',
    grade: 'grade',
    verdict: 'verdict',
  },
  form: {
    steps: {
      first: 'first step',
      second: 'second step',
      third: 'third step',
      fourth: 'forth step',
      fifth: 'fifth step',
      sixth: 'sixth step',
      constraints: 'constraints',
      mainInfo: 'main task info',
      description: 'description',
      examples: 'examples',
      tests: 'tests or checker',
      preview: 'preview',
    },
    validation: {
      title: 'Task must have title at least 5 characters',
      tags: 'Task must have at least 1 tag',
      description:
        'Task must have description at least 20 characters',
      inputFormat: 'Task must have input description',
      outputFormat: 'Task must have output description',
      constraints: {
        memory: 'Memory must be between 0Mb and 1024Mb',
        time: 'Time must be between 0 and 60 seconds',
      },
      complexity: {
        least: 'Complexity must be at least 0%',
        most: 'Complexity must be at most 100%',
      },
      examples: {
        number: 'Task must include at least 1 example',
        empty: 'Task can not have empty examples',
      },
      tests: {
        number: 'Task must include at least 1 test',
        empty: 'Task can not have empty tests',
        text: 'Text task can have only one test',
      },
      hintContent: 'You add hint, but hint content is empty',
      checkerCode:
        'You used checker, but forget to add checker`s code',
      hintAlarm: 'Value must not be less then 0',
    },
    title: 'title',
    complexity: 'complexity',
    description: 'description',
    inputFormat: 'input description',
    outputFormat: 'output description',
    inputExample: 'input example',
    outputExample: 'output example',
    grade: 'grade',
    constraints: {
      title: 'constraints',
      time: 'time (seconds)',
      memory: 'memory (Mb)',
    },
    checkTypes: ['tests', 'checker'],
    taskTypes: ['code task', 'text task'],
    checkType: 'check type',
    taskType: 'task type',
    checker: 'checker',
    hint: {
      title: 'hint',
      alarmType: 'alarm type',
      hintAlarmTypes: ['attempts', 'timestamp (minutes)'],
      text: 'hint text',
      showAfter: 'show after',
    },
    remark: 'remark',
    tests: 'tests',
    inputTest: 'input',
    outputTest: 'output',
    test: 'test',
    example: 'example',
    langSelector: {
      available: 'all languages',
      used: 'selected languages',
      allowed: 'allowed languages',
      forbidden: 'forbidden languages',
    },
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
    allowed: 'Allowed',
    forbidden: 'Forbidden',
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
  selectTags: 'select tags',
  selectGroups: 'select groups',
  title: 'enter title',
};

const errors = {
  minLength: (title: string, len: number) =>
    `${title} should not be shorter than ${len} characters`,
};

const table = {
  perPage: 'per page',
  overall: 'overall',
};

const assignmentSchema = {
  modals: {
    add: 'add assignment schema',
    edit: 'edit assignment schema',
    delete: 'delete assignment schema',
    deleteConfidence:
      'are you sure you want to permanently delete the assignment schema?',
  },
  form: {
    steps: {
      first: {
        label: 'first step',
        description: 'main assignment info',
      },
      second: {
        label: 'second step',
        description: 'add tasks',
      },
      third: {
        label: 'third step',
        description: 'order tasks',
      },
      fourth: {
        label: 'fourth step',
        description: 'preview',
      },
    },
    title: 'title',
    description: 'description',
    defaultDuration: 'default duration (minutes)',
    taskOrdering: {
      title: 'change the tasks order if necessary',
    },
    taskSelector: {
      available: 'available tasks',
      used: 'used tasks',
    },
  },
  list: {
    title: 'title',
    author: 'author',
    description: 'description',
    taskCount: 'task count',
  },
};

const users = {
  list: {
    name: 'name',
    login: 'login',
    grade: 'grade',
  },
};

const groups = {
  add: 'add group',
  title: 'title',
  students: 'students',
  selectedStudents: 'selected students',
};

const notify = {
  errors: {
    unauthorized: 'unauthorized',
  },
  assignmentSchema: {
    create: {
      loading: 'creating the assignment schema',
      success: 'the assignment schema was created successfully',
      error: 'error when creating the assignment schema',
    },
    edit: {
      loading: 'updating the assignment schema',
      success: 'the assignment schema was updated successfully',
      error: 'error when updating the assignment schema',
    },
    delete: {
      loading: 'deleting the assignment schema',
      success: 'the assignment schema was deleted successfully',
      error: 'error when deleting the assignment schema',
    },
  },

  attempt: {
    delete: {
      loading: 'deleting the attempt',
      success: 'the attempt was deleted successfully',
      error: 'error when deleting the attempt',
    },
    send: {
      loading: 'sending the attempt',
      success: 'the attempt was send successfully',
      error: 'error when sending the attempt',
    },
  },

  task: {
    attempts: {
      list: {
        loading: '',
        success: '',
        error: 'error when fetching the attempts',
      },
    },
    create: {
      loading: 'creating the task',
      success: 'the task was created successfully',
      error: 'error when creating the task',
    },
    edit: {
      loading: 'updating the task',
      success: 'the task was updated successfully',
      error: 'error when updating the task',
    },
    delete: {
      loading: 'deleting the task',
      success: 'the task was deleted successfully',
      error: 'error when deleting the task',
    },
    send: {
      loading: 'sending the task',
      success: 'the task was send successfully',
      error: 'error when sending the task',
    },
  },
  group: {
    create: {
      loading: 'creating the group',
      success: 'the group was created successfully',
      error: 'error when creating the group',
    },
    edit: {
      loading: 'updating the group',
      success: 'the task was updated successfully',
      error: 'error when updating the group',
    },
    delete: {
      loading: 'deleting the group',
      success: 'the group was deleted successfully',
      error: 'error when deleting the group',
    },
  },
  auth: {
    signIn: {
      loading: 'checking your data',
      success: 'the sign in was done successfully',
      error: 'error when trying to sign in',
    },
    signUp: {
      loading: 'adding you to our team',
      success: 'you have successfully signed up',
      error: 'error when trying to sign up',
    },
    signOut: {
      loading: 'trying to sign out',
      success: 'the sign out was done successfully',
      error: 'error when trying to sign out',
    },
  },
  tournament: {
    create: {
      loading: 'creating the tournament',
      success: 'the tournament was created successfully',
      error: 'error when creating the tournament',
    },
    edit: {
      loading: 'updating the tournament',
      success: 'the tournament was updated successfully',
      error: 'error when updating the tournament',
    },
    delete: {
      loading: 'deleting the tournament',
      success: 'the tournament was deleted successfully',
      error: 'error when deleting the tournament',
    },
  },
  tournament_task: {
    create: {
      loading: 'creating the tournament task',
      success: 'the tournament task was created successfully',
      error: 'error when creating the tournament task',
    },
    edit: {
      loading: 'updating the tournament task',
      success: 'the tournament task was updated successfully',
      error: 'error when updating the tournament task',
    },
    delete: {
      loading: 'deleting the tournament task',
      success: 'the tournament task was deleted successfully',
      error: 'error when deleting the tournament task',
    },
  },
};

const errorPage = {
  description: 'oops... Page is not found!',
  returnToMain: 'to main page',
};

const tournament = {
  form: {
    steps: {
      first: {
        label: 'first step',
        description: 'main info',
      },
      second: {
        label: 'second step',
        description: 'secondary info',
      },
      third: {
        label: 'third step',
        description: 'type info',
      },
      fourth: {
        label: 'fourth step',
        description: 'preview',
      },
    },
    title: 'title',
    description: 'description',
    allowRegistrationAfterStart: {
      title: 'allow registration after start',
    },
    startDate: 'start date',
    endDate: 'finish date',
    freezeTableDate: 'freeze table date',
    shouldFreezeTable: 'freeze table',
    admins: 'admins',
    selectedAdmins: 'selected admins',
    allowedLanguages: 'allowed languages',
    deniedLanguages: 'denied languages',
    penalty: 'penalty',
    assessmentType: {
      title: 'assessment type',
      forTest: 'by test evaluation',
      forWhole: 'by whole task evaluation',
    },
  },
  list: {
    title: 'title',
    author: 'author',
    start: 'start',
    end: 'end',
    status: 'status',
  },
};

const attempts = {
  date: 'date',
  language: 'language',
  result: 'result',
  verdict: 'verdict',
  status: 'status',
  statuses: ['pending', 'testing', 'finished'],
};

const codeArea = {
  selectFiles: 'select file',
  drag: 'drag files here',
  notification: {
    uploading: { title: 'uploading file...', description: '' },
    reject: {
      title: 'file rejected',
      description: 'file extension is not allowed',
    },
    error: { title: 'error during file uploading', description: '' },
    success: {
      title: 'file has been uploaded successfully',
      description: '',
    },
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
  create: 'create',
  edit: 'edit',
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

export default en;
