import { setter } from '@custom-types/atomic';
import { ITag } from '@custom-types/ITag';
import { useLocale } from '@hooks/useLocale';
import { MultiSelect } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { hasSubarray } from '@utils/hasSubarray';
import { FC, memo } from 'react';
import styles from './tagSearch.module.css';

const TagSearch: FC<{
  setterFunc: setter;
  beforeSelect: any;
  tags: Map<string, ITag>;
  setCurrentTags: setter<any>;
  rowList: any[];
}> = ({
  setterFunc,
  beforeSelect,
  tags,
  setCurrentTags,
  rowList,
}) => {
  const { locale } = useLocale();

  return (
    <div className={styles.selectWrapper}>
      <MultiSelect
        classNames={{
          value: styles.selected,
          searchInput: styles.label,
        }}
        data={Array.from(tags.values()).map((tag) => tag.title)}
        onChange={(value: string[]) => {
          beforeSelect();
          setCurrentTags(value);
          if (value.length > 0) {
            setterFunc(() =>
              rowList.filter((row) => hasSubarray(row.tags, value))
            );
          } else {
            setterFunc(() => rowList);
          }
        }}
        placeholder={capitalize(locale.placeholders.selectTags)}
      />
    </div>
  );
};

export default memo(TagSearch);
