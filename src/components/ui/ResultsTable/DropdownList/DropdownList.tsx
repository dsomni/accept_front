import { FC, memo } from 'react';
import styles from './dropdownList.module.css';
import { IData } from '../ResultsTable';
import { HoverCard } from '@mantine/core';
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
        <HoverCard shadow="md" openDelay={500}>
          <HoverCard.Target>
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
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <div className={styles.restWrapper}>
              {cell.rest.map((item, index) => (
                <Link key={index} href={item.href} passHref>
                  <a
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      backgroundColor:
                        item.text === '...'
                          ? 'var(--neutral)'
                          : cell.best === 'OK'
                          ? 'var(--positive)'
                          : 'var(--negative',
                    }}
                  >
                    {item.text}
                  </a>
                </Link>
              ))}
            </div>
          </HoverCard.Dropdown>
        </HoverCard>
      )}
    </>
  );
};

export default memo(DropdownList);
