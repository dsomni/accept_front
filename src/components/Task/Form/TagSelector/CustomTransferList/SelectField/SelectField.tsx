import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styles from './selectField.module.css';
import { TagItem } from '../../TagItem/TagItem';
import { Item } from '../CustomTransferList';
import { TextInput, Text } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import Fuse from 'fuse.js';

const fuse_options: Fuse.IFuseOptions<Item> = {
  keys: ['label'],
};

export const SelectField: FC<{
  title: string;
  values: Item[];
  handleSelect: (_: Item) => void;
  refetch: () => void;
}> = ({ title, values, handleSelect, refetch }) => {
  const [displayed, setDisplayed] = useState(values);
  const { locale } = useLocale();
  const [searchText, setSearchText] = useState('');

  const fuse = useMemo(
    () => new Fuse(values, fuse_options),
    [values, values.length] // eslint-disable-line
  );

  const search = useCallback(
    (value: string) => {
      if (value !== '') {
        return setDisplayed(
          fuse.search(value).map((result) => result.item)
        );
      }
      return setDisplayed(values);
    },
    [fuse, values]
  );

  useEffect(() => {
    search(searchText);
  }, [values.length, search, searchText]);

  return (
    <>
      <Text size="lg" className={styles.title}>
        {title}
      </Text>
      <div className={styles.header}>
        <div className={styles.searchBar}>
          <TextInput
            placeholder={capitalize(locale.form.search)}
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.content}>
        {displayed.map((item, index) => (
          <TagItem
            key={index}
            item={item}
            onSelect={() => handleSelect(item)}
            refetch={refetch}
          />
        ))}
      </div>
    </>
  );
};
