import {
  showNotification,
  updateNotification,
} from '@mantine/notifications';
import { defaultClassNames } from '@constants/NotificationClassNames';
import { Cross1Icon, CheckIcon } from '@modulz/radix-icons';
import { v4 as uuidv4 } from 'uuid';

const radius = '10px';

export const newNotification = (params: any): string => {
  const id = uuidv4();
  showNotification({
    id,
    loading: true,
    classNames: defaultClassNames,
    disallowClose: true,
    radius,
    ...params,
  });
  return id;
};
export const successNotification = (params: any): void => {
  updateNotification({
    color: 'green',
    icon: <CheckIcon width={24} height={24} />,
    classNames: defaultClassNames,
    loading: false,
    disallowClose: false,
    radius,
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
    radius,
    ...params,
  });
};
