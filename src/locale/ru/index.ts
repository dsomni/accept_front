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

const ru = {
  accept: 'Accept',
  loading: 'Загрузка',
  name: 'Название',
  save: 'Сохранить',
  delete: 'Удалить',
  cancel: 'Отмена',
  yes: 'Да',
  no: 'Нет',
  sure: 'Я уверен(а)',
  error: 'Ошибка',
  success: 'Успешно',
  language: 'Язык',
  all: 'Все',
  create: 'Создать',
  edit: 'Изменить',
  toList: 'К списку',
  validationError: 'Ошибка валидации',
  yourProfile: 'Ваш профиль',
  copy: {
    label: 'Копировать',
    done: 'Скопировано!',
  },
  assignmentSchema,
  assignment,
  attempt,
  dashboard,
  group,
  placeholders,
  profile,
  credentials,
  mainHeaderLinks,
  notification,
  projects,
  date,
  months,
  auth,
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

export default ru;
