import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useCallback, useEffect, useState } from 'react';
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
  fetchURL: string;
}> = ({ setUsed, classNames, initialLangs, fetchURL }) => {
  const { locale } = useLocale();

  const [selectedLangs, setSelectedLangs] =
    useState<Item[]>(initialLangs);
  const [availableLangs, setAvailableLangs] = useState<Item[]>([]);
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
      let langs = res.response;
      let newAvailableLangs: Item[] = [];
      let newSelectedLangs: Item[] = [];
      let lang;
      let selectedSpecs = selectedLangs.map((item) => item.value);
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
      setSelectedLangs(newSelectedLangs);
      setAvailableLangs(newAvailableLangs);
      setLoading(false);
    });
  }, [fetchURL, selectedLangs]);

  useEffect(() => {
    refetch();
  }, []); // eslint-disable-line

  const itemComponent = useCallback(
    (item: Item, handleSelect: any) => {
      return (
        <LanguageItem
          item={item}
          onSelect={() => handleSelect(item)}
        />
      );
    },
    []
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
            capitalize(locale.ui.langSelector.available),
            capitalize(locale.ui.langSelector.used),
          ]}
          itemComponent={itemComponent}
          shouldSortChosen={true}
        />
      )}
    </div>
  );
};

export default memo(LanguageSelector);
