import { projects } from './projects';
import { auth } from './auth';
import { task } from './task';
import { assignmentSchema } from './assignmentSchema';
import { notify } from './notify';
import { tournament } from './tournament';
import { attempt } from './attempt';
import { form, placeholders } from './form';
import { mainHeaderLinks, credentials } from './layout';
import { date, months } from './date';
import { users } from './users';
import { errorPage } from './errorPage';
import { group } from './group';
import { ui } from './ui';
import { helpers } from './helpers';
import { tag } from './tag';
import { notification } from './notification';

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
  all: 'All',
  create: 'Create',
  edit: 'Edit',
  toList: 'To list',
  validationError: 'Validation error',
  attempt,
  group,
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
  ui,
  helpers,
  tag,
  notification,
};

export default en;
