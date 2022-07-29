import {
  showNotification,
  updateNotification,
} from '@mantine/notifications';
import { defaultClassNames } from '@constants/NotificationClassNames';
import { X, Check, InfoCircle } from 'tabler-icons-react';
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
    icon: <Check width={24} height={24} />,
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
    icon: <X width={24} height={24} />,
    classNames: defaultClassNames,
    loading: false,
    disallowClose: false,
    radius,
    ...params,
  });
};
export const infoNotification = (params: any): void => {
  updateNotification({
    color: 'blue',
    icon: <InfoCircle width={24} height={24} />,
    classNames: defaultClassNames,
    loading: false,
    disallowClose: false,
    radius,
    ...params,
  });
};
