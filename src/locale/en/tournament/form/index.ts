import { steps } from './steps';

export const form = {
  steps,
  title: 'Title',
  description: 'Description',
  author: 'Author',
  allowRegistrationAfterStart: 'Registration after start',
  shouldPenalizeAttempt: 'Penalize attempts',
  assessmentType: {
    title: 'Assessment type',
    variants: ['Per test', 'Per task'],
  },

  calendar: 'Select start and end dates',
  startDate: 'Start date',
  startTime: 'Start time',
  endDate: 'End date',
  endTime: 'End time',
  freezeTableDate: 'Froze table date',
  freezeTableTime: 'Froze table time',

  moderators: 'Moderators',
  selectedModerators: 'Selected moderators',
  taskOrdering: 'Task order',
  zeroTask: 'Tasks were not added yet',
};
