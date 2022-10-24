import { FC, ReactNode, useMemo, useState } from 'react';
import styles from './selectField.module.css';
import { Item, useStore } from '../CustomTransferList';
import { useLocale } from '@hooks/useLocale';
import Fuse from 'fuse.js';
import { TextInput } from '@ui/basics';
import inputStyles from '@styles/ui/input.module.css';
import useVirtual from 'react-cool-virtual';

export const SelectField: FC<{
  title: string;
  field: 'options' | 'chosen';
  handleSelect: (_: Item) => void;
  rightComponent?: () => ReactNode;
  itemComponent: (_: any, __: any) => ReactNode;
  classNames: any;
  searchKeys?: string[];
  shrink?: boolean;
}> = ({
  title,
  field,
  handleSelect,
  rightComponent,
  itemComponent,
  classNames,
  searchKeys,
  shrink,
}) => {
  const { locale } = useLocale();
  const [searchText, setSearchText] = useState('');

  const [values] = useStore((store) => store[field]);

  const keys = useMemo(
    () => (searchKeys ? searchKeys : ['label']),
    [searchKeys]
  );

  const fuse = useMemo(
    () =>
      new Fuse(values, {
        keys,
        findAllMatches: true,
      }),
    [values, values.length] // eslint-disable-line
  );

  const searched: Item[] = useMemo(
    () =>
      searchText.length > 0
        ? fuse.search(searchText).map((result) => result.item)
        : values,
    [fuse, searchText, values]
  );

  const { outerRef, innerRef, items } = useVirtual<
    HTMLDivElement,
    HTMLDivElement
  >({
    itemCount: searched.length,
    overscanCount: 10,
  });

  return (
    <div className={shrink ? inputStyles.shrink : ''}>
      <div className={`${inputStyles.label} ${classNames.label}`}>
        {title}
      </div>

      <div className={styles.header}>
        <div className={styles.searchBar}>
          <TextInput
            placeholder={locale.form.search}
            shrink={shrink}
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
        {!!rightComponent && rightComponent()}
      </div>
      <div className={styles.content} ref={outerRef}>
        <div ref={innerRef}>
          {items.map(({ index, measureRef }) => (
            <div key={index} ref={measureRef}>
              {index < searched.length &&
                itemComponent(searched[index], (item: any) => {
                  handleSelect(item);
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
