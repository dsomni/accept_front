import { pureCallback } from '@custom-types/ui/atomic';
import { Modal } from '@mantine/core';
import { FC, ReactNode, memo } from 'react';
import modalStyles from '@styles/ui/modal.module.css';
import { Helper } from '@ui/basics';
import { IDropdownContent } from '@custom-types/ui/basics/helper';

const SimpleModal: FC<{
  title?: ReactNode;
  helperContent?: IDropdownContent;
  opened: boolean;
  close: pureCallback<void>;
  children: ReactNode;
  centered?: boolean;
  hideCloseButton?: boolean;
  size?: string | number;
}> = ({
  title,
  helperContent,
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
          <div className={modalStyles.titleWrapper}>
            <div className={modalStyles.title}>{title}</div>
            {helperContent && (
              <Helper dropdownContent={helperContent} />
            )}
          </div>
        }
        onClose={close}
        zIndex={200}
      >
        <div>{children}</div>
      </Modal>
    </div>
  );
};

export default memo(SimpleModal);
