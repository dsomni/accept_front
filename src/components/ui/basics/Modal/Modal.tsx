import { ModalProps, Modal as MantineModal } from '@mantine/core';
import { FC, memo } from 'react';

const Modal: FC<ModalProps> = (props) => {
  return <MantineModal {...props} />;
};

export default memo(Modal);
