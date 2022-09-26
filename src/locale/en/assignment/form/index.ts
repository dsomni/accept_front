import { steps } from './steps';
import { validation } from './validation';

export const form = {
  steps,
  validation,
  startTime: 'Start time',
  author: 'Author',
  starter: 'Starter',
  infinite: 'Infinite',
  endTime: 'End time',
  calendar: 'Select start and end dates',
  status: {
    text: 'Status',
    0: 'Pending',
    1: 'Running',
    2: 'Finished',
  },
};
