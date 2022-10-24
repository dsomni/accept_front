import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './selectField.module.css';
import { Item } from '../CustomTransferList';
import { useLocale } from '@hooks/useLocale';
import Fuse from 'fuse.js';
import { TextInput } from '@ui/basics';
import inputStyles from '@styles/ui/input.module.css';
import useVirtual from 'react-cool-virtual';

export const SelectField: FC<{
  title: string;
  values: Item[];
  handleSelect: (_: Item) => void;
  rightComponent?: () => ReactNode;
  itemComponent: (_: any, __: any) => ReactNode;
  classNames: any;
  searchKeys?: string[];
  shrink?: boolean;
}> = ({
  title,
  values,
  handleSelect,
  rightComponent,
  itemComponent,
  classNames,
  searchKeys,
  shrink,
}) => {
  const { locale } = useLocale();
  const [searchText, setSearchText] = useState('');

  const [searched, setSearched] = useState(values);

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

  const search = useCallback(
    (value: string) => {
      if (value !== '') {
        return setSearched(() =>
          fuse.search(value).map((result) => result.item)
        );
      }
      return setSearched(values);
    },
    [fuse, values]
  );

  useEffect(() => {
    search(searchText);
  }, [values.length, search, searchText]);

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
      <div
        className={styles.content}
        // key={searched.length}
        ref={outerRef}
      >
        <div ref={innerRef}>
          {items.map(({ index, measureRef }) => (
            <div key={index} ref={measureRef}>
              {index < searched.length &&
                itemComponent(searched[index], handleSelect)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
