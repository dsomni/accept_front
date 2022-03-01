import { ITag } from '@custom-types/ITag';
import { useFetch } from '@hooks/useFetch';
import { TransferList, TransferListData } from '@mantine/core';
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

  const handleChange = useCallback(
    (value: TransferListData) => {
      setTags(value);
      setUsed(value[1].map((item) => item.value));
    },
    [setTags, setUsed]
  );

  return (
    <div className={styles.wrapper}>
      <CustomTransferList
        value={tags}
        onChange={handleChange}
        titles={['Available', 'Used']}
      />
    </div>
  );
};

export default memo(TagSelector);
