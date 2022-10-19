import { pureCallback } from '@custom-types/ui/atomic';
import { Modal } from '@mantine/core';
import { FC, ReactNode, memo } from 'react';
import styles from './simpleModal.module.css';

const SimpleModal: FC<{
  title?: ReactNode;
  titleHelper?: ReactNode;
  opened: boolean;
  close: pureCallback<void>;
  children: ReactNode;
  centered?: boolean;
  hideCloseButton?: boolean;
  size?: string | number;
}> = ({
  title,
  titleHelper,
  opened,
  close,
  children,
  centered,
  size,
  hideCloseButton,
}) => {
  return (
    <div>
      <Modal
        transition="fade"
        transitionDuration={450}
        transitionTimingFunction="ease"
        size={size}
        centered={centered}
        withCloseButton={!!!hideCloseButton}
        opened={opened}
        title={
          titleHelper ? (
            <div className={styles.titleWrapper}>
              <div className={styles.title}>{title}</div>
              {titleHelper}
            </div>
          ) : (
            title
          )
        }
        onClose={close}
        zIndex={200}
      >
        <div className={styles.content}>{children}</div>
      </Modal>
    </div>
  );
};

export default memo(SimpleModal);
