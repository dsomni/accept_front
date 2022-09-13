import { projects } from './projects';
import { auth } from './auth';
import { task } from './task';
import { assignmentSchema } from './assignmentSchema';
import { assignment } from './assignment';
import { notify } from './notify';
import { tournament } from './tournament';
import { attempt } from './attempt';
import { form, placeholders } from './form';
import { credentials, mainHeaderLinks } from './layout';
import { date, months } from './date';
import { users } from './users';
import { errorPage } from './errorPage';
import { group } from './group';
import { ui } from './ui';
import { helpers } from './helpers';
import { tag } from './tag';
import { notification } from './notification';
import { profile } from './profile';
import { dashboard } from './dashboard';
import { timer } from './timer';

const en = {
  accept: 'Accept',
  loading: 'Loading',
  name: 'Title',
  save: 'Save',
  delete: 'Delete',
  cancel: 'Cancel',
  yes: 'Yes',
  no: 'No',
  sure: "I'm sure",
  error: 'Error',
  success: 'Successes',
  language: 'Language',
  add: 'Add',
  all: 'All',
  create: 'Create',
  edit: 'Edit',
  toList: 'To list',
  validationError: 'Validation error',
  yourProfile: 'Your Profile',
  copy: {
    label: 'Copy code to clipboard',
    done: 'Copied code to clipboard',
  },
  newTab: 'Open in the new tab',
  assignmentSchema,
  assignment,
  attempt,
  auth,
  date,
  dashboard,
  group,
  placeholders,
  credentials,
  mainHeaderLinks,
  notification,
  projects,
  profile,
  months,
  task,
  form,
  users,
  notify,
  errorPage,
  tournament,
  ui,
  helpers,
  tag,
  timer,
};

export default en;
