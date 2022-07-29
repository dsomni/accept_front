import { assignmentSchema } from './assignmentSchema';
import { attempt } from './attempt';
import { task } from './task';
import { group } from './group';
import { auth } from './auth';
import { notification } from './notification';
import { tournament } from './tournament';
import { tournament_task } from './tournament_task';

export const notify = {
  errors: {
    unauthorized: 'Вы не авторизованы',
  },
  assignmentSchema,
  attempt,
  task,
  group,
  auth,
  tournament,
  tournament_task,
  notification,
};
