import { FC, memo, useCallback, useState } from 'react';
import { ActionIcon, Button, Group, Modal } from '@mantine/core';
import { TrashIcon } from '@modulz/radix-icons';
import styles from './deleteTag.module.css';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { isSuccessful } from '@requests/request';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import { pureCallback } from '@custom-types/atomic';

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
    }).then((success) => {
      if (success) {
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
        <TrashIcon width={20} height={20} />
      </ActionIcon>
      <Modal
        opened={opened}
        centered
        hideCloseButton
        onClose={() => setOpened(false)}
        size="md"
        title={
          capitalize(locale.tasks.form.tagSelector.delete) +
          ` '${item.label}'`
        }
        classNames={{
          title: styles.modalTitle,
        }}
      >
        <div className={styles.form}>
          <div className={styles.question}>
            {capitalize(
              locale.tasks.form.tagSelector.deleteConfidence
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
