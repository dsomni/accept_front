import { steps } from './steps';
import { validation } from './validation';

export const form = {
  steps,
  validation,
  startTime: 'Start time',
  author: 'Author',
  creator: 'Creator',
  infinite: 'Infinite',
  endTime: 'End time',
  frozeTime: 'Table froze time',
  calendar: 'Select start and end dates',
  status: {
    text: 'Status',
    0: 'Pending',
    1: 'Running',
    2: 'Finished',
  },
};
