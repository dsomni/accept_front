import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';

import { sendRequest, availableMethods } from '@requests/request';
import { IAvailableLang } from '@custom-types/ui/ILocale';
import { callback, setter } from '@custom-types/ui/atomic';

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
    ...params,
  });
  sendRequest<T, V>(endpoint, method, body).then((res) => {
    if (!res.error) {
      successNotification({
        id,
        title: locale.success,
        message: message(res.response),
        ...params,
      });
      if (onSuccess) onSuccess(res.response);
    } else {
      errorNotification({
        id,
        title: locale.error,
        message: res.detail.description[lang],
        ...params,
      });
    }
  });
};
