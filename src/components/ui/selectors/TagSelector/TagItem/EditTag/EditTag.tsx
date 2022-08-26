import { FC, memo, useCallback, useState } from 'react';
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  TextInput,
} from '@mantine/core';
import { Pencil } from 'tabler-icons-react';
import styles from './editTag.module.css';
import { useLocale } from '@hooks/useLocale';

import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { pureCallback } from '@custom-types/ui/atomic';
import { requestWithNotify } from '@utils/requestWithNotify';
import { ITag } from '@custom-types/data/ITag';

const EditTag: FC<{
  item: Item;
  updateURL: string;
  refetch: pureCallback<void>;
}> = ({ item, refetch, updateURL }) => {
  const [opened, setOpened] = useState(false);
  const { locale, lang } = useLocale();
  const [title, setTitle] = useState(item.label);
  const [error, setError] = useState('');

  const validate = useCallback((title: string) => {
    if (title.length >= 3) {
      return true;
    }
    return false;
  }, []);

  const onBlur = useCallback(
    (title: string) => {
      if (validate(title)) {
        return setError('');
      }
      return setError(
        locale.ui.tagSelector.minLength(locale.name, 3)
      );
    },
    [locale, validate]
  );

  const handleSubmit = useCallback(
    (title: string) => {
      if (validate(title)) {
        requestWithNotify<ITag, boolean>(
          updateURL,
          'POST',
          locale.tag.edit,
          lang,
          (_: boolean) => '',
          {
            spec: item.value,
            title: title,
          },
          () => {
            refetch();
            setOpened(false);
          },
          { autoClose: 5000 }
        );
      }
    },
    [validate, updateURL, locale.tag.edit, lang, item.value, refetch]
  );

  return (
    <div className={styles.wrapper}>
      <ActionIcon
        onClick={() => setOpened(true)}
        tabIndex={5}
        color="var(--primary)"
        variant="transparent"
        size="lg"
      >
        <Pencil width={20} height={20} />
      </ActionIcon>
      <Modal
        opened={opened}
        centered
        onClose={() => setOpened(false)}
        size="md"
        title={locale.ui.tagSelector.edit + ` '${item.label}'`}
        classNames={{
          title: styles.modalTitle,
        }}
      >
        <div className={styles.form}>
          <TextInput
            className={styles.input}
            autoFocus
            required
            label={locale.name}
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
              {locale.cancel}
            </Button>
            <Button
              variant="outline"
              color="green"
              onClick={() => handleSubmit(title)}
            >
              {locale.save}
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
};

export default memo(EditTag);
