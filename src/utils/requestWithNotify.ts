import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';
import { capitalize } from '@utils/capitalize';
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
    title: capitalize(locale.loading),
    message: capitalize(locale.loading) + '...',
    ...params,
  });
  sendRequest<T, V>(endpoint, method, body).then((res) => {
    if (!res.error) {
      successNotification({
        id,
        title: capitalize(locale.success),
        message: message(res.response),
        ...params,
      });
      if (onSuccess) onSuccess(res.response);
    } else {
      errorNotification({
        id,
        title: capitalize(locale.error),
        message: capitalize(res.detail.description[lang]),
        ...params,
      });
    }
  });
};
