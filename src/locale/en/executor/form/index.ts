import { validation } from './validation';

export const form = {
  collection: 'Collection',
  action: 'Action',
  query: 'Query',
  body: 'Body',
  params: 'Other parameters',
  spec_field: 'Spec field',

  helper: {
    spec_field: [
      'Only for "insert_many" action',
      'Leave the field empty if there is no need to generate unique identifiers for the elements',
      'Otherwise, specify the element field to which the unique identifier will be generated',
    ],
  },
  error: {
    parse: 'Error when parsing fields',
  },
  validation,
};
