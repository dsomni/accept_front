import { FC, memo } from 'react';
import styles from './dropdownList.module.css';
import { IData } from '../ResultsTable';
import { Menu } from '@mantine/core';

const DropdownList: FC<{ cell: IData }> = ({ cell }) => {
  return (
    <>
      {cell.rest.length <= 0 ? (
        <div>{cell.best}</div>
      ) : (
        <Menu
          shadow="md"
          openDelay={400}
          trigger="hover"
          position="bottom-start"
        >
          <Menu.Target>
            <div>{cell.best}</div>
          </Menu.Target>
          <Menu.Dropdown>
            <div className={styles.restWrapper}>
              {cell.rest.map((item, index) => (
                <Menu.Item key={index}>{item}</Menu.Item>
              ))}
            </div>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
};

export default memo(DropdownList);
