import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import styles from './tagSelector.module.css';
import { sendRequest } from '@requests/request';
import { ITag } from '@custom-types/data/ITag';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import { TagItem } from './TagItem/TagItem';
import AddTag from './AddTag/AddTag';
import { setter } from '@custom-types/ui/atomic';

const TagSelector: FC<{
  initialTags: Item[];
  setUsed: setter<any>;
  classNames?: object;
  fetchURL: string;
  addURL: string;
  updateURL: string;
  deleteURL: string;
}> = ({
  setUsed,
  classNames,
  initialTags,
  fetchURL,
  addURL,
  updateURL,
  deleteURL,
}) => {
  const { locale } = useLocale();

  const [selectedTags, setSelectedTags] =
    useState<Item[]>(initialTags);
  const [availableTags, setAvailableTags] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    sendRequest<{}, ITag[]>(fetchURL, 'GET', undefined, 5000).then(
      (res) => {
        if (res.error) return;
        let tags = res.response;
        let newAvailableTags: Item[] = [];
        let newSelectedTags: Item[] = [];
        let tag;
        let selectedSpecs = selectedTags.map((item) => item.value);
        for (let i = 0; i < tags.length; i++) {
          tag = {
            value: tags[i].spec,
            label: tags[i].title,
          };
          if (selectedSpecs.includes(tag.value)) {
            newSelectedTags.push(tag);
          } else {
            newAvailableTags.push(tag);
          }
        }
        setSelectedTags(newSelectedTags);
        setAvailableTags(newAvailableTags);
        setLoading(false);
      }
    );
  }, [fetchURL, selectedTags]);

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  const itemComponent = useCallback(
    (item, handleSelect) => {
      return (
        <TagItem
          item={item}
          onSelect={() => handleSelect(item)}
          refetch={refetch}
          updateURL={updateURL}
          deleteURL={deleteURL}
        />
      );
    },
    [refetch, deleteURL, updateURL]
  );

  return (
    <div className={styles.wrapper}>
      {!loading && (
        <CustomTransferList
          defaultOptions={availableTags}
          defaultChosen={selectedTags}
          setUsed={setUsed}
          classNames={classNames ? classNames : {}}
          titles={[
            capitalize(locale.tasks.form.tagSelector.available),
            capitalize(locale.tasks.form.tagSelector.used),
          ]}
          itemComponent={itemComponent}
          rightComponent={() => (
            <AddTag addURL={addURL} refetch={refetch} />
          )}
          shouldSortChosen={true}
        />
      )}
    </div>
  );
};

export default memo(TagSelector);
