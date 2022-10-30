import { useLocale } from '@hooks/useLocale';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { sendRequest } from '@requests/request';
import { ITag } from '@custom-types/data/ITag';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import { TagItem } from './TagItem/TagItem';
import AddTag from './AddTag/AddTag';
import { setter } from '@custom-types/ui/atomic';
import { InputWrapper } from '@ui/basics';

const TagSelector: FC<{
  initialTags: Item[];
  setUsed: setter<any>;
  classNames?: object;
  shrink?: boolean;
  fetchURL: string;
  addURL: string;
  updateURL: string;
  deleteURL: string;
  form: any;
  field: string;
}> = ({
  setUsed,
  classNames,
  shrink,
  initialTags,
  fetchURL,
  addURL,
  updateURL,
  deleteURL,
  form,
  field,
}) => {
  const { locale } = useLocale();
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTags, availableTags] = useMemo(() => {
    let newAvailableTags: Item[] = [];
    let newSelectedTags: Item[] = [];
    let tag;
    let selectedSpecs = initialTags.map((item) => item.value);
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
    return [newSelectedTags, newAvailableTags];
  }, [initialTags, tags]);

  const refetch = useCallback(async () => {
    setLoading(true);
    sendRequest<{}, ITag[]>(fetchURL, 'GET').then((res) => {
      if (res.error) return;
      setTags(res.response);

      setLoading(false);
    });
  }, [setTags, fetchURL]);

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  const itemComponent = useCallback(
    (item: any, handleSelect: any) => {
      return (
        <TagItem
          item={item}
          onSelect={() => handleSelect(item)}
          refetch={refetch}
          updateURL={updateURL}
          deleteURL={deleteURL}
          shrink={shrink}
        />
      );
    },
    [refetch, updateURL, deleteURL, shrink]
  );

  return (
    <InputWrapper shrink={shrink} {...form.getInputProps(field)}>
      {!loading && (
        <CustomTransferList
          defaultOptions={availableTags}
          defaultChosen={selectedTags}
          setUsed={setUsed}
          classNames={classNames ? classNames : {}}
          titles={[
            locale.ui.tagSelector.available,
            locale.ui.tagSelector.used,
          ]}
          itemComponent={itemComponent}
          rightComponent={() => (
            <AddTag addURL={addURL} refetch={refetch} />
          )}
          shouldSortChosen={true}
          shrink={shrink}
        />
      )}
    </InputWrapper>
  );
};

export default memo(TagSelector);
