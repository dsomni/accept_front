import { FC, memo, ReactNode } from 'react';
import styles from './profileLink.module.css';
import { UnstyledButton, Group } from '@mantine/core';
import { pureCallback } from '@custom-types/ui/atomic';

export interface ILink {
  icon: ReactNode;
  title: string;
}

const ProfileLink: FC<{
  link: ILink;
  onClick: pureCallback;
  isActive: boolean;
}> = ({ link, onClick, isActive }) => {
  return (
    <>
      <UnstyledButton
        className={`${styles.button} ${
          isActive ? styles.activeButton : ''
        }`}
        onClick={onClick}
      >
        <Group spacing="xs">
          <div
            className={`${styles.line} ${
              isActive ? styles.activeLine : ''
            }`}
          ></div>
          <Group>
            {link.icon}
            <div>{link.title}</div>
          </Group>
        </Group>
      </UnstyledButton>
    </>
  );
};

export default memo(ProfileLink);
