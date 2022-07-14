import { FC, memo, useCallback, useState } from 'react';
import { ActionIcon, Button, Group, Modal } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import styles from './deleteTag.module.css';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { isSuccessful } from '@requests/request';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { pureCallback } from '@custom-types/ui/atomic';

const DeleteTag: FC<{
  item: Item;
  deleteURL: string;
  refetch: pureCallback<void>;
}> = ({ item, refetch, deleteURL }) => {
  const [opened, setOpened] = useState(false);
  const { locale } = useLocale();

  const handleSubmit = useCallback(() => {
    isSuccessful(deleteURL, 'POST', {
      spec: item.value,
    }).then((res) => {
      if (!res.error) {
        refetch();
        setOpened(false);
      }
    });
  }, [item, refetch, deleteURL]);

  return (
    <div className={styles.wrapper}>
      <ActionIcon
        onClick={() => setOpened(true)}
        tabIndex={5}
        color="red"
        variant="hover"
        size="lg"
      >
        <Trash width={20} height={20} />
      </ActionIcon>
      <Modal
        opened={opened}
        centered
        onClose={() => setOpened(false)}
        size="md"
        title={
          capitalize(locale.task.form.tagSelector.delete) +
          ` '${item.label}'`
        }
        classNames={{
          title: styles.modalTitle,
        }}
      >
        <div className={styles.form}>
          <div className={styles.question}>
            {capitalize(
              locale.task.form.tagSelector.deleteConfidence
            )}
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
              {capitalize(locale.cancel)}
            </Button>
            <Button
              variant="outline"
              color="red"
              onClick={() => handleSubmit()}
            >
              {capitalize(locale.delete)}
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
};

export default memo(DeleteTag);
