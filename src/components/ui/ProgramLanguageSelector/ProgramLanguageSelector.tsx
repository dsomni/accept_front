import { ILanguage } from '@custom-types/data/atomic';
import { callback } from '@custom-types/ui/atomic';
import { sendRequest } from '@requests/request';
import { capitalize } from '@utils/capitalize';
import { memo, FC, ReactNode, useEffect, useState } from 'react';

const ProgramLanguageSelector: FC<{
  selector: callback<any, ReactNode>;
  defaultLangSpec: string;
}> = ({ selector, defaultLangSpec }) => {
  const [langs, setLangs] = useState<ILanguage[]>([]);
  const [defaultLang, setDefaultLang] = useState({
    name: '',
    spec: 0,
  });

  useEffect(() => {
    sendRequest<{}, ILanguage[]>('language', 'GET').then((res) => {
      if (!res.error) {
        setLangs(res.response);
      }
    });
  }, []);

  useEffect(() => {
    const lang = langs.find(
      (item) => item.spec.toString() === defaultLangSpec
    );
    console.log(lang);
    if (lang) {
      console.log(1);
      setDefaultLang(lang);
    }
  }, [defaultLangSpec, langs]);

  return (
    <div>
      {selector({
        data: langs.map((lang) => ({
          label: capitalize(lang.name),
          value: lang.spec.toString(),
        })),
        defaultValue: { label: '123', value: '3' },
        // langs.length > 0
        //   ? {
        //       label: capitalize(defaultLang.name),
        //       value: defaultLang.spec.toString(),
        //     }
        //   : { label: '', value: '' },
      })}
    </div>
  );
};

export default memo(ProgramLanguageSelector);
