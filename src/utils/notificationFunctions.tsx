import {
  showNotification,
  updateNotification,
} from '@mantine/notifications';
import { defaultClassNames } from '@constants/NotificationClassNames';
import { Cross1Icon, CheckIcon } from '@modulz/radix-icons';

export const newNotification = (params: any): void => {
  showNotification({
    loading: true,
    classNames: defaultClassNames,
    disallowClose: true,
    ...params,
  });
};
export const successNotification = (params: any): void => {
  updateNotification({
    color: 'green',
    icon: <CheckIcon width={24} height={24} />,
    classNames: defaultClassNames,
    loading: false,
    disallowClose: false,
    ...params,
  });
};
export const errorNotification = (params: any): void => {
  updateNotification({
    color: 'red',
    icon: <Cross1Icon width={24} height={24} />,
    classNames: defaultClassNames,
    loading: false,
    disallowClose: false,
    ...params,
  });
};
