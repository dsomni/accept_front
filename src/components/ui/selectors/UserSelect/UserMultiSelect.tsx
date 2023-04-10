import React, {
  FC,
  forwardRef,
  memo,
  useCallback,
  useMemo,
} from 'react';
import { Avatar, Text } from '@mantine/core';
import { link } from '@constants/Avatar';
import { MultiSelect } from '@ui/basics';
import { Eye } from 'tabler-icons-react';
import styles from './userSelect.module.css';
import Link from 'next/link';
import { UserItemProps, UserSelectProps } from './UserSelect';
import { IUserDisplay } from '@custom-types/data/IUser';

const UserMultiSelect: FC<UserSelectProps> = ({
  label,
  placeholder,
  users,
  nothingFound,
  select,
  multiple, //eslint-disable-line
  additionalProps,
}) => {
  const SelectItem = forwardRef<HTMLDivElement, UserItemProps>(
    ({ image, label, value, ...others }: UserItemProps, ref) => (
      <div className={styles.item} ref={ref}>
        <div
          onMouseDown={others.onMouseDown}
          onMouseEnter={others.onMouseEnter}
          className={styles.left}
        >
          <Avatar
            radius="md"
            size="md"
            src={image}
            alt={'User`s avatar'}
          />
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {value}
            </Text>
          </div>
        </div>
        <div className={styles.itemIcon}>
          <Link href={`/profile/${value}`}>
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
          } as UserItemProps)
      ),
    [users]
  );

  const onSelect = useCallback(
    (logins: string[]) => {
      if (logins.length == 0) {
        select(undefined);
        return;
      }
      const map = new Map(users.map((item) => [item.login, item]));

      select(logins.map((item) => map.get(item) as IUserDisplay));
    },
    [select, users]
  );

  return (
    <>
      <MultiSelect
        searchable
        data={data}
        itemComponent={SelectItem}
        label={label}
        placeholder={placeholder}
        clearable
        maxDropdownHeight={400}
        nothingFound={nothingFound}
        filter={(value, selected, item) =>
          item.label
            ?.toLowerCase()
            .includes(value.toLowerCase().trim()) ||
          item.value
            .toLowerCase()
            .includes(value.toLowerCase().trim())
        }
        {...additionalProps}
        onChange={(logins) => {
          onSelect(logins);
          additionalProps?.onChange(logins);
        }}
      />
    </>
  );
};

export default memo(UserMultiSelect);
