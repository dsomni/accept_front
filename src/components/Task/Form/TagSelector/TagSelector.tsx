import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { CustomTransferList } from './CustomTransferList/CustomTransferList';
import styles from './tagSelector.module.css';
import { Item } from './CustomTransferList/CustomTransferList';

const TagSelector: FC<{
  initialTags: string[];
  setUsed: (_: any) => void;
  classNames?: object;
}> = ({ setUsed, classNames }) => {
  const { locale } = useLocale();

  const [selectedTags, setSelectedTags] = useState<Item[]>([]);
  const [availableTags, setAvailableTags] = useState<Item[]>([]);

  const refetch = useCallback(async () => {
    fetch('/api/tags/list').then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          let newAvailableTags: Item[] = [];
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
              newAvailableTags.push(tag);
            }
          }
          setSelectedTags(newSelectedTags);
          setAvailableTags(newAvailableTags);
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
          options={availableTags}
          chosen={selectedTags}
          setUsed={setUsed}
          setChosen={setSelectedTags}
          setOptions={setAvailableTags}
          classNames={classNames ? classNames : {}}
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
