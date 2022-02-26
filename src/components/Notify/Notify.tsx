import { useLocale } from '@hooks/useLocale';
import { Notification } from '@mantine/core';
import { FC, memo } from 'react';
import { Cross1Icon, CheckIcon } from '@modulz/radix-icons';

const Notify: FC<{
  answer: boolean;
  error: boolean;
  setAnswer: (_: boolean) => void;
}> = ({ answer, error, setAnswer }) => {
  const { locale } = useLocale();

  return (
    <>
      {answer &&
        (error ? (
          <Notification
            icon={<Cross1Icon />}
            color="red"
            onClose={() => setAnswer(false)}
          >
            {locale.tasks.status.error}
          </Notification>
        ) : (
          <Notification
            icon={<CheckIcon />}
            color="green"
            onClose={() => setAnswer(false)}
          >
            {locale.tasks.status.ok}
          </Notification>
        ))}
    </>
  );
};

export default memo(Notify);
