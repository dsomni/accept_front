export const tagSelector = {
    minLength: (title: string, len: number) =>
        `${title} should not be shorter than ${len} characters`,
    available: 'available tags',
    used: 'used tags',
    add: 'add tag',
    edit: 'edit tag',
    delete: 'delete tag',
    addPlaceholder: "enter tag's name",
    deleteConfidence:
    'are you sure you want to permanently delete the tag?',
};