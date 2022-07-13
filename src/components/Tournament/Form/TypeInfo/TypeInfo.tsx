import { useLocale } from '@hooks/useLocale';
import { MultiSelect } from '@mantine/core';
import Select from '@ui/Select/Select';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useState, useEffect } from 'react';
import TagSelector from '@ui/TagSelector/TagSelector';
import styles from './typeInfo.module.css';
import ProgramLanguageSelector from '@components/ui/ProgramLanguageSelector/ProgramLanguageSelector';
import { IAssessmentType } from '@custom-types/data/ITournament';

const TypeInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  // useEffect(() => {
  //   console.log(form.values.assessmentType);
  // }, [form.values.assessmentType]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.languages}>
        <ProgramLanguageSelector
          selector={(props: any) => (
            <MultiSelect
              disabled={form.values.deniedLanguages.length > 0}
              classNames={{
                label: styles.label,
                wrapper: styles.selectorWrapper,
                value: styles.value,
                item: styles.items,
              }}
              label={capitalize(
                locale.tournament.form.allowedLanguages
              )}
              {...form.getInputProps('allowedLanguages', {
                type: 'select',
              })}
              {...props}
            />
          )}
        />
        <ProgramLanguageSelector
          selector={(props: any) => (
            <MultiSelect
              disabled={form.values.allowedLanguages.length > 0}
              classNames={{
                label: styles.label,
                wrapper: styles.selectorWrapper,
                value: styles.value,
                item: styles.items,
              }}
              label={capitalize(
                locale.tournament.form.deniedLanguages
              )}
              {...form.getInputProps('deniedLanguages', {
                type: 'select',
              })}
              {...props}
            />
          )}
        />
      </div>
      <Select
        classNames={{
          label: styles.label,
          input: styles.items,
          item: styles.items,
        }}
        label={capitalize(
          locale.tournament.form.assessmentType.title
        )}
        data={[
          {
            label: capitalize(
              locale.tournament.form.assessmentType.forTest
            ),
            value: IAssessmentType.FOR_TEST,
          },
          {
            label: capitalize(
              locale.tournament.form.assessmentType.forWhole
            ),
            value: IAssessmentType.FOR_WHOLE,
          },
        ]}
        {...form.getInputProps('assessmentType', {
          type: 'select',
        })}
      />
    </div>
  );
};

export default memo(TypeInfo);
