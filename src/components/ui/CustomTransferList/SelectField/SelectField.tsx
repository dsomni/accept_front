import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './selectField.module.css';
import { Item } from '../CustomTransferList';
import { Text } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';
import Fuse from 'fuse.js';
import { TextInput } from '@ui/basics';
import { useDebouncedValue } from '@mantine/hooks';

const RANGE_SIZE = 20;

export const SelectField: FC<{
  title: string;
  values: Item[];
  handleSelect: (_: Item) => void;
  rightComponent?: () => ReactNode;
  itemComponent: (_: any, __: any) => ReactNode;
  classNames: any;
  searchKeys?: string[];
}> = ({
  title,
  values,
  handleSelect,
  rightComponent,
  itemComponent,
  classNames,
  searchKeys,
}) => {
  const { locale } = useLocale();
  const [searchText, setSearchText] = useState('');
  const scrollable = useRef<HTMLDivElement>(null!);
  const element = useRef<HTMLDivElement>(null!);

  const [lowIndexState, setLowIndexState] = useState(0);
  const [lowIndex] = useDebouncedValue(lowIndexState, 10);
  const [displayed, setDisplayed] = useState(
    values.slice(
      lowIndex,
      Math.min(lowIndex + RANGE_SIZE, values.length)
    )
  );
  const [searched, setSearched] = useState(values);
  const [elementHeight, setElementHeight] = useState(0);
  const [postfixHeight, setPostfixHeight] = useState(0);

  useEffect(() => {
    console.log(values);
  }, [values]);

  useEffect(() => {
    if (element.current) {
      setElementHeight(element.current.clientHeight);
    }
  }, [element]);

  useEffect(() => {
    setDisplayed(
      searched.slice(
        0,
        Math.min(lowIndex + RANGE_SIZE, searched.length)
      )
    );
    setPostfixHeight(
      elementHeight * (searched.length - lowIndex - RANGE_SIZE)
    );
  }, [searched, lowIndex, elementHeight]);

  const handleScroll = useCallback(
    (e: Event) => {
      if (e.target && elementHeight > 0) {
        const top_offset = Math.floor(
          // @ts-ignore-line
          e.target.scrollTop / elementHeight
        );
        setLowIndexState(top_offset);
      }
    },
    [elementHeight]
  );

  useEffect(() => {
    const area = scrollable.current;
    console.log('listener');
    if (area) {
      area.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (area) area.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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
      setLowIndexState(0);
      return setSearched(values);
    },
    [fuse, values]
  );

  useEffect(() => {
    search(searchText);
  }, [values.length, search, searchText]);

  return (
    <>
      <Text
        size="lg"
        className={styles.title + ' ' + classNames.label}
      >
        {title}
      </Text>
      <div className={styles.header}>
        <div className={styles.searchBar}>
          <TextInput
            placeholder={locale.form.search}
            onChange={(e: any) => setSearchText(e.target.value)}
          />
        </div>
        {!!rightComponent && rightComponent()}
      </div>
      <div
        key={values.length}
        className={styles.content}
        ref={scrollable}
      >
        {displayed.map((item, index) => (
          <div ref={index == 0 ? element : null} key={index}>
            {itemComponent(item, handleSelect)}
          </div>
        ))}
        <div
          className={styles.postfix}
          style={{ height: postfixHeight }}
        />
      </div>
    </>
  );
};
