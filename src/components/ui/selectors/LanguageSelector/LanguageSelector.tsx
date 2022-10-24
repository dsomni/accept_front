import { useLocale } from '@hooks/useLocale';

import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './languageSelector.module.css';
import { sendRequest } from '@requests/request';
import { ILanguage } from '@custom-types/data/atomic';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import { LanguageItem } from './LanguageItem/LanguageItem';
import { setter } from '@custom-types/ui/atomic';

const LanguageSelector: FC<{
  initialLangs: Item[];
  setUsed: setter<any>;
  classNames?: object;
  shrink?: boolean;
  fetchURL: string;
}> = ({ setUsed, classNames, shrink, initialLangs, fetchURL }) => {
  const { locale } = useLocale();
  const [langs, setLangs] = useState<ILanguage[]>([]);

  const [availableLangs, selectedLangs] = useMemo(() => {
    let newAvailableLangs: Item[] = [];
    let newSelectedLangs: Item[] = [];
    let lang;
    let selectedSpecs = initialLangs.map((item) => item.value);
    for (let i = 0; i < langs.length; i++) {
      lang = {
        value: langs[i].spec.toString(),
        label: langs[i].name,
      };
      if (selectedSpecs.includes(lang.value)) {
        newSelectedLangs.push(lang);
      } else {
        newAvailableLangs.push(lang);
      }
    }
    return [newAvailableLangs, newSelectedLangs];
  }, [initialLangs, langs]);

  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    sendRequest<{}, ILanguage[]>(
      fetchURL,
      'GET',
      undefined,
      600000
    ).then((res) => {
      if (res.error) return;
      setLangs(res.response);
      setLoading(false);
    });
  }, [fetchURL]);

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  const itemComponent = useCallback(
    (item: Item, handleSelect: any) => {
      return (
        <LanguageItem
          shrink={shrink}
          item={item}
          onSelect={() => handleSelect(item)}
        />
      );
    },
    [shrink]
  );

  return (
    <div className={styles.wrapper}>
      {!loading && (
        <CustomTransferList
          defaultOptions={availableLangs}
          defaultChosen={selectedLangs}
          setUsed={setUsed}
          classNames={classNames ? classNames : {}}
          titles={[
            locale.ui.langSelector.available,
            locale.ui.langSelector.used,
          ]}
          itemComponent={itemComponent}
          shouldSortChosen={true}
          shrink={shrink}
        />
      )}
    </div>
  );
};

export default memo(LanguageSelector);
