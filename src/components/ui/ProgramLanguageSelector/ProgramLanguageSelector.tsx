import { ILanguage } from '@custom-types/data/atomic';
import { callback } from '@custom-types/ui/atomic';
import { sendRequest } from '@requests/request';
import { capitalize } from '@utils/capitalize';
import { memo, FC, ReactNode, useEffect, useState } from 'react';

const ProgramLanguageSelector: FC<{
  selector: callback<any, ReactNode>;
}> = ({ selector }) => {
  const [langs, setLangs] = useState<ILanguage[]>([]);

  useEffect(() => {
    sendRequest<{}, ILanguage[]>('language', 'GET').then((res) => {
      if (!res.error) {
        setLangs(res.response);
      }
    });
  }, []);

  return (
    <div>
      {selector({
        data: langs.map((lang) => ({
          label: capitalize(lang.name),
          value: lang.spec.toString(),
        })),
        defaultValue:
          langs.length > 1
            ? { label: capitalize(langs[1].name), value: '1' }
            : { label: '', value: '' },
      })}
    </div>
  );
};

export default memo(ProgramLanguageSelector);
