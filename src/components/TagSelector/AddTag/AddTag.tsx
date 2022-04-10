import { FC, memo, useCallback, useState } from 'react';
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  TextInput,
} from '@mantine/core';
import { PlusIcon } from '@modulz/radix-icons';
import styles from './addTag.module.css';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { isSuccessful } from '@requests/request';

const AddTag: FC<{ refetch: () => void; addURL: string }> = ({
  refetch,
  addURL,
}) => {
  const [opened, setOpened] = useState(false);
  const { locale } = useLocale();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const validate = useCallback((title: string) => {
    if (title.length >= 3) {
      return true;
    }
    return false;
  }, []);

  const onBlur = useCallback(
    (title) => {
      if (validate(title)) {
        return setError('');
      }
      return setError(
        capitalize(locale.errors.minLength(locale.name, 3))
      );
    },
    [locale, validate]
  );

  const handleSubmit = useCallback(
    (title) => {
      if (validate(title)) {
        isSuccessful(addURL, 'POST', {
          title: title,
        }).then((success) => {
          if (success) {
            refetch();
            setOpened(false);
          }
        });
      }
    },
    [addURL, refetch, validate]
  );

  return (
    <div className={styles.wrapper}>
      <ActionIcon
        onClick={() => setOpened(true)}
        tabIndex={5}
        color="blue"
        variant="hover"
        size="lg"
      >
        <PlusIcon width={20} height={20} color="green" />
      </ActionIcon>
      <Modal
        opened={opened}
        centered
        hideCloseButton
        onClose={() => setOpened(false)}
        size="md"
        title={capitalize(locale.tasks.form.tagSelector.add)}
        classNames={{
          title: styles.modalTitle,
        }}
      >
        <div className={styles.form}>
          <TextInput
            className={styles.input}
            autoFocus
            required
            label={capitalize(locale.name)}
            size="md"
            onChange={(e: any) => setTitle(e.target.value)}
            onBlur={() => onBlur(title)}
            error={error}
            placeholder={capitalize(
              locale.tasks.form.tagSelector.addPlaceholder
            )}
          />
          <Group
            position="right"
            spacing="lg"
            className={styles.buttons}
          >
            <Button
              variant="outline"
              color="red"
              onClick={() => setOpened(false)}
            >
              {capitalize(locale.cancel)}
            </Button>
            <Button
              variant="outline"
              color="green"
              onClick={() => handleSubmit(title)}
            >
              {capitalize(locale.save)}
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
};

export default memo(AddTag);
