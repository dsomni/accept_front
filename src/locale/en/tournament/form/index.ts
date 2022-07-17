import { steps } from "./steps"

export const form = {
    steps,
    title: 'title',
    description: 'description',
    allowRegistrationAfterStart: {
        title: 'allow registration after start',
    },
    startDate: 'start date',
    endDate: 'finish date',
    freezeTableDate: 'freeze table date',
    shouldFreezeTable: 'freeze table',
    admins: 'admins',
    selectedAdmins: 'selected admins',
    allowedLanguages: 'allowed languages',
    deniedLanguages: 'denied languages',
    penalty: 'penalty',
    assessmentType: {
        title: 'assessment type',
        forTest: 'by test evaluation',
        forWhole: 'by whole task evaluation',
    },
  }