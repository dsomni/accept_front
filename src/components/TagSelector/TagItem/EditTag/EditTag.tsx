import { FC, memo, useCallback, useState } from 'react';
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  TextInput,
} from '@mantine/core';
import { Pencil1Icon } from '@modulz/radix-icons';
import styles from './editTag.module.css';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { isSuccessful } from '@requests/request';
import { Item } from '@components/CustomTransferList/CustomTransferList';

const EditTag: FC<{
  item: Item;
  updateURL: string;
  refetch: () => void;
}> = ({ item, refetch, updateURL }) => {
  const [opened, setOpened] = useState(false);
  const { locale } = useLocale();
  const [title, setTitle] = useState(item.label);
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
        isSuccessful(updateURL, 'POST', {
          spec: item.value,
          title: title,
        }).then((success) => {
          if (success) {
            refetch();
            setOpened(false);
          }
        });
      }
    },
    [item, refetch, validate, updateURL]
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
        <Pencil1Icon width={20} height={20} />
      </ActionIcon>
      <Modal
        opened={opened}
        centered
        hideCloseButton
        onClose={() => setOpened(false)}
        size="md"
        title={
          capitalize(locale.tasks.form.tagSelector.edit) +
          ` '${item.label}'`
        }
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
            defaultValue={item.label}
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

export default memo(EditTag);
