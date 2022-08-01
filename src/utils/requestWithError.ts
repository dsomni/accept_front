import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';

import { sendRequest, availableMethods } from '@requests/request';
import { IAvailableLang } from '@custom-types/ui/ILocale';
import { setter } from '@custom-types/ui/atomic';
import { hideNotification } from '@mantine/notifications';

const defaultAutoClose = 5000;

export const requestWithError = <T, V>(
  endpoint: string,
  method: availableMethods,
  locale: {
    loading: string;
    error: string;
  },
  lang: IAvailableLang,
  body?: T extends object ? T : object,
  onSuccess?: setter<V>,
  params?: any
) => {
  sendRequest<T, V>(endpoint, method, body).then((res) => {
    if (!res.error) {
      if (onSuccess) onSuccess(res.response);
    } else {
      const id = newNotification({
        title: locale.loading,
        message: locale.loading + '...',
        autoClose: defaultAutoClose,
        ...params,
      });
      errorNotification({
        id,
        title: locale.error,
        message: res.detail.description[lang],
        autoClose: defaultAutoClose,
        ...params,
      });
    }
  });
};
