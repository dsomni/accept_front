import { modals } from "./modals";
import { description } from "./description";
import { list } from './list'
import {form} from './form'

export const task = {
  constraints: {
    time: 'time',
    memory: 'memory',
  },
  modals,
  description,
  send: 'send',
  results: 'results',
  list,
  form,
  status: {
    error: 'Error on task submit',
    ok: 'Attempt successfully submitted',
  },
  submit: 'submit',
};