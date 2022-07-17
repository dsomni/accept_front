import { projects } from './projects';
import { auth } from './auth';
import { task } from './task';
import { assignmentSchema } from './assignmentSchema';
import { notify } from './notify';
import { tournament } from './tournament';
import { attempts } from './attempts';
import { form, placeholders } from './form';
import { mainHeaderLinks, credentials } from './layout';
import { date, months } from './date';
import { users } from './users';
import { errorPage } from './errorPage';
import { groups } from './groups';
import { ui } from './ui';

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
  attempts,
  groups,
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
};

export default ru;
