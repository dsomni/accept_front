import { ITag } from '@custom-types/ITag';
import { useFetch } from '@hooks/useFetch';
import { useLocale } from '@hooks/useLocale';
import { TransferListData } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CustomTransferList } from './CustomTransferList/CustomTransferList';
import styles from './tagSelector.module.css';

const TagSelector: FC<{
  initialTags: string[];
  setUsed: (_: any) => void;
}> = ({ initialTags, setUsed }) => {
  const { locale } = useLocale();

  const [tags, setTags] = useState<TransferListData>([[], []]);

  const [baseTags, setBaseTags] = useState<ITag[]>([]);

  useFetch('/api/tags/list', setBaseTags);

  useEffect(() => {
    let newBaseTags = [];
    let newUsedTags = [];
    let tag;
    for (let i = 0; i < baseTags.length; i++) {
      tag = {
        value: baseTags[i]['spec'],
        label: baseTags[i]['title'],
      };
      if (initialTags.includes(tag.value)) {
        newUsedTags.push(tag);
      } else {
        newBaseTags.push(tag);
      }
    }
    setTags([newBaseTags, newUsedTags]);
  }, [baseTags, initialTags]);

  return (
    <div className={styles.wrapper}>
      {tags[0].length > 0 && (
        <CustomTransferList
          value={tags}
          onChange={setUsed}
          titles={[
            capitalize(locale.tasks.form.tagSelector.available),
            capitalize(locale.tasks.form.tagSelector.used),
          ]}
        />
      )}
    </div>
  );
};

export default memo(TagSelector);
