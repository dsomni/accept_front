export const notification = {
  hasNew: 'New notifications',
  amount: (amount: number) =>
    amount > 1
      ? `You have ${amount} new notifications`
      : `You have new notification`,
  create: {
    loading: 'Creating the notification',
    success: 'The notification was created successfully',
    error: 'Error when creating the notification',
  },
};
