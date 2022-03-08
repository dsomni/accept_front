import { useLocale } from '@hooks/useLocale';
import { Select } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo } from 'react';

type Lang = 'py' | 'cpp' | 'rs';

const Languages: { label: string; value: Lang }[] = [
  {
    label: 'Python',
    value: 'py',
  },
  {
    label: 'C++',
    value: 'cpp',
  },
  {
    label: 'Rust',
    value: 'rs',
  },
];

const ProgrammingLangSelector: FC<{
  setValue: (_: Lang) => void;
  classNames?: object;
}> = ({ setValue, classNames }) => {
  const { locale } = useLocale();

  return (
    <Select
      label={capitalize(locale.language)}
      classNames={classNames}
      defaultValue={'py'}
      data={Languages}
      onChange={setValue}
    />
  );
};

export default memo(ProgrammingLangSelector);
