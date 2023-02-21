import { IMenuLink } from '@custom-types/ui/IMenuLink';
import { Group, Navbar, UnstyledButton } from '@mantine/core';
import { FC, ReactNode, memo, useState } from 'react';
import styles from './leftMenu.module.scss';

const LeftMenu: FC<{
  links: IMenuLink[];
  initialStep?: number;
  topContent?: ReactNode;
  hideTitles?: boolean;
}> = ({ links, initialStep, topContent, hideTitles }) => {
  const [current, setCurrent] = useState(initialStep || 0);

  return (
    <div className={styles.wrapper}>
      <Navbar
        p="xs"
        width={{ base: 300 }}
        withBorder={false}
        zIndex={10}
        classNames={{ root: styles.navbar }}
      >
        {topContent && <Navbar.Section>{topContent}</Navbar.Section>}
        <Navbar.Section grow mt="md">
          {links.map((element, idx) => (
            <UnstyledButton
              key={idx}
              className={`${styles.button} ${
                current === idx ? styles.activeButton : ''
              }`}
              onClick={() => setCurrent(idx)}
            >
              <Group spacing="xs" className={styles.groupWrapper}>
                <div
                  className={`${styles.line} ${
                    current === idx ? styles.activeLine : ''
                  }`}
                ></div>
                <Group className={styles.groupWrapper}>
                  {element.icon}
                  {!hideTitles && <div>{element.title}</div>}
                </Group>
              </Group>
            </UnstyledButton>
          ))}
        </Navbar.Section>
      </Navbar>
      <div className={styles.pageWrapper}>
        {links[current]?.page || links[0]?.page || ''}
      </div>
    </div>
  );
};

export default memo(LeftMenu);
