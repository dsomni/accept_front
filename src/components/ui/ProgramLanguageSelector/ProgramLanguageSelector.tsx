import { ILanguage } from '@custom-types/data/atomic';
import { callback } from '@custom-types/ui/atomic';
import { capitalize } from '@utils/capitalize';
import { memo, FC, ReactNode, useEffect, useState } from 'react';

const ProgramLanguageSelector: FC<{
  selector: callback<any, ReactNode>;
  defaultLangSpec: string;
  languages: ILanguage[];
}> = ({ selector, defaultLangSpec, languages }) => {
  const [defaultLang, setDefaultLang] = useState({
    name: '',
    spec: 0,
  });

  useEffect(() => {
    const lang = languages.find(
      (item) => item.spec.toString() === defaultLangSpec
    );
    if (lang) {
      setDefaultLang(lang);
    }
  }, [defaultLangSpec, languages]);

  return (
    <div>
      {selector({
        data: languages.map((lang) => ({
          label: capitalize(lang.name),
          value: lang.spec.toString(),
        })),
        defaultValue: { label: '123', value: '3' },
      })}
    </div>
  );
};

export default memo(ProgramLanguageSelector);
