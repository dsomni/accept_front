import { FC, memo, useCallback, useState } from 'react';
import { ActionIcon, Button, Group, Modal } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import styles from './deleteTag.module.css';
import { useLocale } from '@hooks/useLocale';
import { isSuccessful } from '@requests/request';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { pureCallback } from '@custom-types/ui/atomic';
import { requestWithNotify } from '@utils/requestWithNotify';

const DeleteTag: FC<{
  item: Item;
  deleteURL: string;
  refetch: pureCallback<void>;
}> = ({ item, refetch, deleteURL }) => {
  const [opened, setOpened] = useState(false);
  const { locale, lang } = useLocale();

  const handleSubmit = useCallback(() => {
    requestWithNotify<{ spec: string }, any>(
      deleteURL,
      'POST',
      locale.tag.delete,
      lang,
      (response: any) => '',
      {
        spec: item.value,
      },
      () => {
        refetch();
        setOpened(false);
      },
      { autoClose: 5000 }
    );
  }, [deleteURL, locale.tag.delete, lang, item.value, refetch]);

  return (
    <div className={styles.wrapper}>
      <ActionIcon
        onClick={() => setOpened(true)}
        tabIndex={5}
        color="red"
        variant="transparent"
        size="lg"
      >
        <Trash width={20} height={20} />
      </ActionIcon>
      <Modal
        opened={opened}
        centered
        onClose={() => setOpened(false)}
        size="md"
        title={locale.ui.tagSelector.delete + ` '${item.label}'`}
        classNames={{
          title: styles.modalTitle,
        }}
      >
        <div className={styles.form}>
          <div className={styles.question}>
            {locale.ui.tagSelector.deleteConfidence}
          </div>
          <Group
            position="right"
            spacing="lg"
            className={styles.buttons}
          >
            <Button
              variant="outline"
              color="green"
              autoFocus
              onClick={() => setOpened(false)}
            >
              {locale.cancel}
            </Button>
            <Button
              variant="outline"
              color="red"
              onClick={() => handleSubmit()}
            >
              {locale.delete}
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
};

export default memo(DeleteTag);
