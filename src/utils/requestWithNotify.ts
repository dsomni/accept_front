import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';

import { availableMethods, sendRequest } from '@requests/request';
import { IAvailableLang } from '@custom-types/ui/ILocale';
import { callback, setter } from '@custom-types/ui/atomic';

const defaultAutoClose = 5000;

export const requestWithNotify = <T, V>(
  endpoint: string,
  method: availableMethods,
  locale: {
    loading: string;
    success: string;
    error: string;
  },
  lang: IAvailableLang,
  message: callback<V, string>,
  body?: T extends object ? T : object,
  onSuccess?: setter<V>,
  params?: any
) => {
  const id = newNotification({
    title: locale.loading,
    message: locale.loading + '...',
    autoClose: defaultAutoClose,
    ...params,
  });
  sendRequest<T, V>(endpoint, method, body).then((res) => {
    if (!res.error) {
      successNotification({
        id,
        title: locale.success,
        message: message(res.response),
        autoClose: defaultAutoClose,
        ...params,
      });
      if (onSuccess) onSuccess(res.response);
    } else {
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
