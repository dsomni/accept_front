import { useLocale } from '@hooks/useLocale';
import { capitalize } from '@utils/capitalize';
import { FC, memo } from 'react';
import { callback } from '@custom-types/atomic';
import { Select } from '@mantine/core';
import ProgramLanguageSelector from '@components/ui/ProgramLanguageSelector/ProgramLanguageSelector';

type Lang = 'python' | 'c++' | 'java' | 'pascal';

const ProgrammingLangSelector: FC<{
  setValue: callback<Lang, void>;
  classNames?: object;
}> = ({ setValue, classNames }) => {
  const { locale } = useLocale();

  return (
    <ProgramLanguageSelector
      selector={(props: any) => (
        <Select
          label={capitalize(locale.language)}
          classNames={classNames}
          onChange={setValue}
          {...props}
        />
      )}
    />
  );
};

export default memo(ProgrammingLangSelector);
