import { modals } from './modals';
import { description } from './description';
import { list } from './list';
import { form } from './form';

export const task = {
  constraints: {
    time: 'Time',
    memory: 'Memory',
  },
  modals,
  description,
  send: 'Send',
  results: 'Results',
  list,
  form,
  status: {
    error: 'Error on task submit',
    ok: 'Attempt successfully submitted',
  },
  submit: 'Submit',
};
