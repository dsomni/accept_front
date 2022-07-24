import { steps } from './steps';

export const form = {
  steps,
  title: 'Title',
  description: 'Description',
  allowRegistrationAfterStart: {
    title: 'Allow registration after start',
  },
  startDate: 'Start date',
  endDate: 'Finish date',
  freezeTableDate: 'Freeze table date',
  shouldFreezeTable: 'Freeze table',
  admins: 'Admins',
  selectedAdmins: 'Selected admins',
  allowedLanguages: 'Allowed languages',
  deniedLanguages: 'Denied languages',
  penalty: 'Penalty',
  assessmentType: {
    title: 'Assessment type',
    forTest: 'By test evaluation',
    forWhole: 'By whole task evaluation',
  },
};
