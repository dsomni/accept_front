import { ActionIcon, Modal } from '@mantine/core';
import { FC, memo, ReactNode, useState } from 'react';
import styles from './openModal.module.css';

const OpenModal: FC<{
  icon: ReactNode;
  color: string;
  size?: number;
  title?: string;
  children: ReactNode;
}> = ({ icon, color, size, title, children }) => {
  const [opened, setOpened] = useState(true);

  return (
    <div>
      <Modal
        opened={opened}
        title={title}
        classNames={{
          title: styles.modalTitle,
        }}
        onClose={() => setOpened(false)}
      >
        {children}
      </Modal>
      <ActionIcon
        variant="outline"
        size={size || 40}
        onClick={() => {
          setOpened(true);
        }}
        color={color}
      >
        {icon}
      </ActionIcon>
    </div>
  );
};

export default memo(OpenModal);
