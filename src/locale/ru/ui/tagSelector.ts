
export const tagSelector = {

    minLength: (title: string, len: number) =>
        `${title} должен быть не короче ${len} символов`,
    available: 'все теги',
    used: 'выбранные теги',
    edit: 'редактировать тег',
    add: 'добавить тег',
    delete: 'удалить тег',
    addPlaceholder: 'введите название тега',
    deleteConfidence:
    'вы уверены, что хотите безвозвратно удалить этот тег?',
}