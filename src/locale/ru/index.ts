import { projects } from "./projects";
import { auth } from "./auth";
import { task } from "./task";
import { assignmentSchema } from "./assignmentSchema";
import { notify } from "./notify";
import { tournament } from "./tournament";
import { attempts } from "./attempts";
import { form, placeholders } from "./form";
import { mainHeaderLinks, credentials } from "./layout";
import { date, months } from "./date";
import { users } from "./users";
import { errorPage } from "./errorPage";
import { groups } from "./groups";
import { ui } from "./ui";



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
