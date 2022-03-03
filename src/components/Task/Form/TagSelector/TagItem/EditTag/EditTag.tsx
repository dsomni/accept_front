import { FC, memo, useCallback, useEffect, useState } from 'react';
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
import { useForm } from '@mantine/hooks';
import { Item } from '../../CustomTransferList/CustomTransferList';
import { capitalize } from '@utils/capitalize';

const EditTag: FC<{ item: Item }> = ({ item }) => {
  const [opened, setOpened] = useState(false);
  const { locale } = useLocale();

  const form = useForm({
    initialValues: {
      title: item.label,
    },

    validationRules: {
      title: (value: string) => value.length >= 3,
    },

    errorMessages: {
      title: capitalize(locale.errors.minLength(locale.name, 3)),
    },
  });

  const handleSubmit = useCallback(
    (values) => {
      if (form.validate()) {
        fetch('/api/tags/edit', {
          method: 'POST',
          body: JSON.stringify({
            spec: item.value,
            title: values.title,
          }),
        });
      }
    },
    [item, form]
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
        <form
          className={styles.form}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            className={styles.input}
            autoFocus
            required
            label={capitalize(locale.name)}
            size="md"
            onBlur={(e: any) => form.validateField('title')}
            {...form.getInputProps('title')}
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
            <Button variant="outline" color="green" type="submit">
              {capitalize(locale.save)}
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default memo(EditTag);
