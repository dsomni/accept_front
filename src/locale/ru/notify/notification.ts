export const notification = {
  hasNew: 'Новые уведомления',
  amount: (amount: number) =>
    amount == 1
      ? 'У вас новое уведомление'
      : amount % 10 == 1 && amount % 100 == 11
      ? `У вас ${amount} новое уведомление`
      : [2, 3, 4].includes(amount % 10) &&
        ![12, 13, 14].includes(amount % 100)
      ? `У вас ${amount} новых уведомления`
      : // : [0, 5, 6, 7, 8, 9].includes(amount % 10) ||
        //   [11, 12, 13, 14].includes(amount % 100)
        `У вас ${amount} новых уведомлений`,
  create: {
    loading: 'Создаём уведомление',
    success: 'Уведомление успешно создано',
    error: 'Ошибка при создании уведомления',
  },
};
