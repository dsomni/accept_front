export const notification = {
  hasNew: 'Новые уведомления',
  amount: (amount: number) =>
    amount > 1
      ? `У вас ${amount} новых уведомлений`
      : 'У вас новое уведомление',
  create: {
    loading: 'Создаём уведомление',
    success: 'Уведомление успешно создано',
    error: 'Ошибка при создании уведомления',
  },
};
