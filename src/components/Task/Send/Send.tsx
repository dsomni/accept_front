import { Button } from '@mantine/core';
import { FC, memo, useCallback, useState } from 'react';
import { useLocale } from '@hooks/useLocale';
import { useUser } from '@hooks/useUser';
import notificationStyles from '@styles/ui/notification.module.css';
import { isSuccessful } from '@requests/request';
import CodeArea from '@ui/CodeArea/CodeArea';
import {
  errorNotification,
  newNotification,
  successNotification,
} from '@utils/notificationFunctions';
import { capitalize } from '@utils/capitalize';

const Send: FC<{ spec: string }> = ({ spec }) => {
  const { locale } = useLocale();
  const { user } = useUser();

  const [lang, setLang] = useState('cpp');
  const [code, setCode] = useState('');

  const handleSubmit = useCallback(() => {
    newNotification({
      id: 'sending-task',
      title: capitalize(locale.notify.task.send.loading),
      message: capitalize(locale.loading) + '...',
    });
    isSuccessful('attempts/submit', 'POST', {
      author: user?.login,
      task: spec,
      language: lang,
      programText: code,
    }).then((success) => {
      if (success) {
        successNotification({
          id: 'sending-task',
          title: capitalize(
            locale.notify.assignmentSchema.create.success
          ),
        });
      } else {
        errorNotification({
          id: 'sending-task',
          title: capitalize(
            locale.notify.assignmentSchema.create.error
          ),
          message: capitalize(locale.error),
        });
      }
    });
  }, [lang, code, user, spec, locale]);

  return (
    <div>
      <CodeArea label={''} setLanguage={setLang} setCode={setCode} />
      <Button onClick={handleSubmit}>{locale.tasks.submit}</Button>
    </div>
  );
};

export default memo(Send);
