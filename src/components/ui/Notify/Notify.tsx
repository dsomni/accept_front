import { useLocale } from '@hooks/useLocale';
import { Notification } from '@mantine/core';
import { FC, memo, ReactNode } from 'react';
import { Cross1Icon, CheckIcon } from '@modulz/radix-icons';
import { capitalize } from '@utils/capitalize';
import styles from './notify.module.css';
import { setter } from '@custom-types/atomic';

const Notify: FC<{
  answer: boolean;
  error: boolean;
  setAnswer: setter<boolean>;
  status?: string;
  description?: ReactNode | string;
}> = ({ answer, error, setAnswer, status, description }) => {
  const { locale } = useLocale();

  return (
    <>
      {answer &&
        (error ? (
          <Notification
            icon={<Cross1Icon width={20} height={20} />}
            color="red"
            onClose={() => setAnswer(false)}
            title={capitalize(status ? status : locale.error)}
            classNames={{
              title: styles.title,
              icon: styles.icon,
            }}
          >
            {description}
          </Notification>
        ) : (
          <Notification
            icon={<CheckIcon width={30} height={30} />}
            color="green"
            onClose={() => setAnswer(false)}
            title={capitalize(status ? status : locale.success)}
            classNames={{
              title: styles.title,
              icon: styles.icon,
            }}
          >
            {description}
          </Notification>
        ))}
    </>
  );
};

export default memo(Notify);
