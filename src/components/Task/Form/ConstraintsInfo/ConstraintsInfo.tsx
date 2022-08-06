import LanguageSelector from '@ui/LanguageSelector/LanguageSelector';
import { FC, memo, useState, useMemo, useCallback } from 'react';
import { Item } from '@ui/CustomTransferList/CustomTransferList';
import styles from './constraintsInfo.module.css';
import { Box } from '@mantine/core';
import {
  Switch,
  SegmentedControl,
  NumberInput,
  Overlay,
} from '@ui/basics';
import { useLocale } from '@hooks/useLocale';
import stepperStyles from '@styles/ui/stepper.module.css';

const ConstraintsInfo: FC<{ form: any }> = ({ form }) => {
  const initialAllowedLanguages = useMemo(
    () => {
      return form.values.allowedLanguages;
    },
    [form.values.spec] // eslint-disable-line
  );
  const initialForbiddenLanguages = useMemo(
    () => {
      return form.values.forbiddenLanguages;
    },
    [form.values.spec] // eslint-disable-line
  );
  const initialLanguage = useMemo(
    () => initialAllowedLanguages.concat(initialForbiddenLanguages),
    [initialAllowedLanguages, initialForbiddenLanguages]
  );

  const [option, setOption] = useState<string>(
    initialForbiddenLanguages.length === 0 ? 'allowed' : 'forbidden'
  );

  const setLanguages = useCallback(
    (langs: Item[]) => {
      form.setFieldValue(`${option}Languages`, langs);
    },
    [option, form]
  );

  const onOptionChange = useCallback(
    (value: string) => {
      setOption(value);
      if (value == 'allowed') {
        form.setFieldValue(
          'allowedLanguages',
          form.values.forbiddenLanguages
        );
        form.setFieldValue('forbiddenLanguages', []);
      } else {
        form.setFieldValue(
          'forbiddenLanguages',
          form.values.allowedLanguages
        );
        form.setFieldValue('allowedLanguages', []);
      }
    },
    [form]
  );

  const { locale } = useLocale();

  return (
    <>
      <div style={{ width: 'fit-content' }}>
        <Switch
          label={locale.task.form.restrictLanguages}
          helperContent={
            <div>
              {locale.helpers.task.restrictLanguages.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          }
          {...form.getInputProps('shouldRestrictLanguages', {
            type: 'checkbox',
          })}
        />
      </div>

      <Box style={{ position: 'relative' }}>
        <div className={styles.languages}>
          {!form.values.shouldRestrictLanguages && <Overlay />}
          <SegmentedControl
            data={[
              {
                label: locale.task.form.allowed,
                value: 'allowed',
              },
              {
                label: locale.task.form.forbidden,
                value: 'forbidden',
              },
            ]}
            value={option}
            onChange={onOptionChange}
          />
          <LanguageSelector
            initialLangs={initialLanguage}
            setUsed={setLanguages}
            fetchURL={'language'}
            classNames={{
              label: stepperStyles.label,
            }}
          />
        </div>
      </Box>

      <div></div>
      <NumberInput
        label={locale.task.form.constraints.memory}
        required
        noClampOnBlur
        hideControls
        min={0}
        onBlur={() => {
          form.validateField('constraintsMemory');
        }}
        {...form.getInputProps('constraintsMemory')}
      />
      <NumberInput
        label={locale.task.form.constraints.time}
        required
        hideControls
        precision={1}
        onBlur={() => {
          form.validateField('constraintsTime');
        }}
        {...form.getInputProps('constraintsTime')}
      />
    </>
  );
};

export default memo(ConstraintsInfo);
