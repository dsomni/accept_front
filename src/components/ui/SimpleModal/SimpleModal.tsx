import { pureCallback } from '@custom-types/ui/atomic';
import { Modal } from '@mantine/core';
import { FC, memo, ReactNode } from 'react';
import styles from './simpleModal.module.css';

const SimpleModal: FC<{
  title?: string;
  opened: boolean;
  close: pureCallback<void>;
  children: ReactNode;
  centered?: boolean;
  hideCloseButton?: boolean;
}> = ({
  title,
  opened,
  close,
  children,
  centered,
  hideCloseButton,
}) => {
  return (
    <div>
      <Modal
        transition="fade"
        transitionDuration={450}
        transitionTimingFunction="ease"
        size="xl"
        centered={centered}
        withCloseButton={!!!hideCloseButton}
        opened={opened}
        title={title}
        classNames={{
          title: styles.modalTitle,
        }}
        onClose={close}
      >
        <div className={styles.content}>{children}</div>
      </Modal>
    </div>
  );
};

export default memo(SimpleModal);