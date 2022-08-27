import { modals } from './modals';
import { description } from './description';
import { list } from './list';
import { form } from './form';

export const task = {
  constraints: {
    time: 'Time',
    memory: 'Memory',
  },
  complexity: 'Complexity',
  modals,
  description,
  send: 'Send',
  answer: 'Answer',
  results: 'Results',
  list,
  form,
  status: {
    error: 'Error on task submit',
    ok: 'Attempt successfully submitted',
  },
  submit: 'Submit',
};
