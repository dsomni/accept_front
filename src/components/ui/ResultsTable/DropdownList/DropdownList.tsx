import { FC, memo } from 'react';
import styles from './dropdownList.module.css';
import { IData } from '../ResultsTable';
import { Menu } from '@mantine/core';
import Link from 'next/link';

const DropdownList: FC<{ cell: IData }> = ({ cell }) => {
  return (
    <>
      {cell.rest.length === 0 && (
        <div
          style={{
            color:
              cell.best === '-'
                ? 'var(--dark3)'
                : cell.best === 'OK'
                ? 'var(--positive)'
                : 'var(--negative',
          }}
        >
          {cell.best}
        </div>
      )}
      {cell.rest.length > 0 && (
        <Menu
          shadow="md"
          openDelay={500}
          trigger="hover"
          position="bottom-start"
        >
          <Menu.Target>
            <div
              style={{
                color:
                  cell.best === '-'
                    ? 'var(--dark3)'
                    : cell.best.startsWith('TS')
                    ? 'var(--neutral)'
                    : cell.best.startsWith('OK')
                    ? 'var(--positive)'
                    : 'var(--negative',
              }}
            >
              {cell.best}
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <div className={styles.restWrapper}>
              {cell.rest.map((item, index) => (
                <Menu.Item key={index}>
                  <Link href={item.href} passHref>
                    <a
                      style={{
                        textDecoration: 'none',
                        color: item.text.startsWith('TS')
                          ? 'var(--neutral)'
                          : item.text.startsWith('OK')
                          ? 'var(--positive)'
                          : 'var(--negative',
                      }}
                    >
                      {item.text}
                    </a>
                  </Link>
                </Menu.Item>
              ))}
            </div>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
};

export default memo(DropdownList);
