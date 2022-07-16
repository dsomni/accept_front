export const tagSelector = {
  minLength: (title: string, len: number) =>
    `${title} should not be shorter than ${len} characters`,
  available: 'Available tags',
  used: 'Used tags',
  add: 'Add tag',
  edit: 'Edit tag',
  delete: 'Delete tag',
  addPlaceholder: "enter tag'S name",
  deleteConfidence:
    'Are you sure you want to permanently delete the tag?',
};
