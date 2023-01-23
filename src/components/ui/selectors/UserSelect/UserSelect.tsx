import React, {
  FC,
  forwardRef,
  memo,
  useCallback,
  useMemo,
} from 'react';
import { IUserDisplay } from '@custom-types/data/IUser';
import { Avatar, Text } from '@mantine/core';
import { link } from '@constants/Avatar';
import { Select } from '@ui/basics';
import { Eye } from 'tabler-icons-react';
import styles from './userSelect.module.css';
import Link from 'next/link';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  role: string;
  value: string;
}

const UserSelect: FC<{
  label: string;
  placeholder: string;
  nothingFound: string;
  users: IUserDisplay[];
  select: (_: IUserDisplay) => void;
}> = ({ label, placeholder, users, select, nothingFound }) => {
  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, role, value, ...others }: ItemProps, ref) => (
      <div className={styles.item} ref={ref}>
        <div {...others}>
          <Avatar
            radius="md"
            size="md"
            src={image}
            alt={'User`s avatar'}
          />
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {role}
            </Text>
          </div>
        </div>
        <div className={styles.itemIcon}>
          <Link passHref href={`/profile/${value}`} legacyBehavior>
            <Eye color={'var(--primary)'} />
          </Link>
        </div>
      </div>
    )
  );
  SelectItem.displayName = 'SelectItem';

  const data = useMemo(
    () =>
      users.map(
        (item) =>
          ({
            image: link(item.login),
            label: item.shortName,
            value: item.login,
            role: item.role.name,
          } as ItemProps)
      ),
    [users]
  );

  const onSelect = useCallback(
    (login: string) => {
      const userIndex = users.findIndex(
        (item) => item.login === login
      );
      if (userIndex > 0) {
        select(users[userIndex]);
      }
    },
    [select, users]
  );

  return (
    <>
      <Select
        searchable
        data={data}
        itemComponent={SelectItem}
        label={label}
        placeholder={placeholder}
        clearable
        maxDropdownHeight={400}
        onChange={onSelect}
        nothingFound={nothingFound}
        filter={(value, item) =>
          item.label
            ?.toLowerCase()
            .includes(value.toLowerCase().trim()) ||
          item.value
            .toLowerCase()
            .includes(value.toLowerCase().trim())
        }
      />
    </>
  );
};

export default memo(UserSelect);
