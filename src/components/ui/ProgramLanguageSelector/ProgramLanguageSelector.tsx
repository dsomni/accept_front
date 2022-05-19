import { callback } from '@custom-types/ui/atomic';
import { sendRequest } from '@requests/request';
import { capitalize } from '@utils/capitalize';
import { memo, FC, ReactNode, useEffect, useState } from 'react';

const ProgramLanguageSelector: FC<{
  selector: callback<any, ReactNode>;
}> = ({ selector }) => {
  const [langs, setLangs] = useState<string[]>([]);

  useEffect(() => {
    sendRequest<{}, { languages: string[] }>('languages', 'GET').then(
      (res) => {
        if (!res.error) {
          setLangs(res.response.languages);
        }
      }
    );
  }, []);

  return (
    <div>
      {selector({ data: langs.map((lang) => capitalize(lang)) })}
    </div>
  );
};

export default memo(ProgramLanguageSelector);
