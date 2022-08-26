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
                ? 'dark3'
                : cell.best === 'OK'
                ? 'var(--positive)'
                : 'var(--negative',
          }}
        >
          {cell.best}
        </div>
      )}
      {cell.rest.length > 0 && (
        <Menu shadow="md" openDelay={500} trigger="hover">
          <Menu.Target>
            <div
              style={{
                color:
                  cell.best === '-'
                    ? 'dark3'
                    : cell.best === 'OK'
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
                        color:
                          item.text === 'TS'
                            ? 'var(--neutral)'
                            : item.text === 'OK'
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
