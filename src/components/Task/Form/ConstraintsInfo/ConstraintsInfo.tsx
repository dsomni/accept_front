import LanguageSelector from '@components/ui/LanguageSelector/LanguageSelector';
import { FC, memo, useState, useMemo, useCallback } from 'react';
import { Item } from '@components/ui/CustomTransferList/CustomTransferList';
import styles from './constraintsInfo.module.css';
import {
  Box,
  NumberInput,
  Overlay,
  SegmentedControl,
  Switch,
} from '@mantine/core';
import { useLocale } from '@hooks/useLocale';

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
    <div className={styles.wrapper}>
      <Switch
        label={'Restrict languages'}
        size="lg"
        style={{ marginBottom: 'var(--spacer-l)' }}
        {...form.getInputProps('shouldRestrictLanguages', {
          type: 'checkbox',
        })}
      />
      <div className={styles.languages}>
        <Box style={{ position: 'relative' }}>
          {!form.values.shouldRestrictLanguages && (
            <Overlay opacity={0} color="#000" blur={2} />
          )}
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
            style={{
              margin: 'var(--spacer-l) 0',
            }}
            styles={{
              label: {
                fontSize: 'var(--font-size-l)',
              },
            }}
          />
          <LanguageSelector
            initialLangs={initialLanguage}
            setUsed={setLanguages}
            fetchURL={'language'}
          />
        </Box>
      </div>
      <div className={styles.constraints}>
        <NumberInput
          classNames={{
            label: styles.label,
          }}
          size="lg"
          label={locale.task.form.constraints.memory}
          required
          noClampOnBlur
          hideControls
          min={0}
          onBlur={() => {
            form.validateField('constraintsMemory');
          }}
          style={{
            margin: 'var(--spacer-l) 0',
          }}
          {...form.getInputProps('constraintsMemory')}
        />
        <NumberInput
          classNames={{
            label: styles.label,
          }}
          size="lg"
          label={locale.task.form.constraints.time}
          required
          hideControls
          precision={1}
          onBlur={() => {
            form.validateField('constraintsTime');
          }}
          style={{
            margin: 'var(--spacer-l) 0',
          }}
          {...form.getInputProps('constraintsTime')}
        />
      </div>
    </div>
  );
};

export default memo(ConstraintsInfo);
