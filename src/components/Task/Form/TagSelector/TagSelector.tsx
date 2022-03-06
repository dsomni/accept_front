import { ITag } from '@custom-types/ITag';
import { useFetch } from '@hooks/useFetch';
import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { CustomTransferList } from './CustomTransferList/CustomTransferList';
import styles from './tagSelector.module.css';
import { Item } from './CustomTransferList/CustomTransferList';

type callback = (_: Item[]) => Item[];

const TagSelector: FC<{
  initialTags: string[];
  setUsed: (_: any) => void;
}> = ({ setUsed }) => {
  const { locale } = useLocale();

  const [selectedTags, setSelectedTags] = useState<Item[]>([]);
  const [avaliableTags, setAvaliableTags] = useState<Item[]>([]);

  const refetch = useCallback(async () => {
    fetch('/api/tags/list').then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          let newAvaliableTags: Item[] = [];
          let newSelectedTags: Item[] = [];
          let tag;
          let selectedSpecs = selectedTags.map((item) => item.value);
          for (let i = 0; i < res.length; i++) {
            tag = {
              value: res[i]['spec'],
              label: res[i]['title'],
            };
            if (selectedSpecs.includes(tag.value)) {
              newSelectedTags.push(tag);
            } else {
              newAvaliableTags.push(tag);
            }
          }
          setSelectedTags(newSelectedTags);
          setAvaliableTags(newAvaliableTags);
        });
      }
    });
  }, [selectedTags]);

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  return (
    <div className={styles.wrapper}>
      {
        <CustomTransferList
          refetch={refetch}
          options={avaliableTags}
          chosen={selectedTags}
          setUsed={setUsed}
          setChosen={setSelectedTags}
          setOptions={setAvaliableTags}
          titles={[
            capitalize(locale.tasks.form.tagSelector.available),
            capitalize(locale.tasks.form.tagSelector.used),
          ]}
        />
      }
    </div>
  );
};

export default memo(TagSelector);
