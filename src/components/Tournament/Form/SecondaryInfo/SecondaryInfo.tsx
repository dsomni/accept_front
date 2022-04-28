import { useLocale } from '@hooks/useLocale';
import { Switch } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useState, useCallback, useEffect } from 'react';
import styles from './secondaryInfo.module.css';
import 'dayjs/locale/ru';
import DateTimePicker from '@components/ui/DateTimePicker/DateTimePicker';
import { sendRequest } from '@requests/request';
import { IUser } from '@custom-types/IUser';
import { CustomTransferList } from '@components/ui/CustomTransferList/CustomTransferList';

const SecondaryInfo: FC<{ form: any }> = ({ form }) => {
  const { locale } = useLocale();

  const [disableFreeze, setDisableFreeze] = useState(false);
  const setField = useCallback((field: string) => {
    return (value: number) => form.setFieldValue(field, value);
  }, []); //eslint-disable-line

  const freezeHandler = useCallback((value) => {
    setDisableFreeze(value.target.checked);
    if (!value.target.checked) {
      form.setFieldValue('freezeTable', undefined);
    }
  }, []); //eslint-disable-line

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cleanUp = false;
    setLoading(true);
    sendRequest<{}, IUser[]>('users/list', 'GET').then((res) => {
      if (!cleanUp) {
        if (!res.error) {
          setUsers(res.response);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    });
    return () => {
      cleanUp = true;
    };
  }, []); //eslint-disable-line

  const itemComponent = useCallback((item, handleSelect) => {
    return (
      <div
        className={styles.itemWrapper}
        onClick={() => handleSelect(item)}
      >
        <div className={styles.displayedName}>{item.name}</div>
        <div className={styles.displayedLogin}>{item.login}</div>
      </div>
    );
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.dateWrapper}>
        <DateTimePicker
          value={form.values['start'] || new Date().getTime()}
          setValue={setField('start')}
          classNames={{
            label: styles.label,
            wrapper: styles.pickerWrapper,
          }}
          label={capitalize(locale.tournament.form.startDate)}
        />
        <DateTimePicker
          value={form.values['end'] || new Date().getTime()}
          setValue={setField('end')}
          classNames={{
            label: styles.label,
            wrapper: styles.pickerWrapper,
          }}
          label={capitalize(locale.tournament.form.endDate)}
        />
      </div>
      <div className={styles.froze}>
        <Switch
          classNames={{
            label: styles.label,
          }}
          label={capitalize(locale.tournament.form.shouldFreezeTable)}
          size="lg"
          onChange={freezeHandler}
        />
        {disableFreeze && (
          <DateTimePicker
            value={form.values['freezeTable'] || new Date().getTime()}
            setValue={setField('freezeTable')}
            classNames={{
              label: styles.label,
              wrapper:
                styles.pickerWrapper +
                ' ' +
                styles.freezeTableWrapper,
            }}
            label={capitalize(locale.tournament.form.freezeTableDate)}
          />
        )}
      </div>

      {!loading && (
        <CustomTransferList
          defaultOptions={users.map((user) => ({
            ...user,
            label: user.name + ' ' + user.login,
            value: user.login,
          }))}
          defaultChosen={[]}
          setUsed={(value) => {
            form.setFieldValue('admins', value);
          }}
          classNames={{ label: styles.label }}
          titles={[
            capitalize(locale.tournament.form.admins),
            capitalize(locale.tournament.form.selectedAdmins),
          ]}
          itemComponent={itemComponent}
        />
      )}
      <Switch
        classNames={{
          label: styles.label,
        }}
        label={capitalize(
          locale.tournament.form.allowRegistrationAfterStart.title
        )}
        size="lg"
        {...form.getInputProps('allowRegistrationAfterStart', {
          type: 'checkbox',
        })}
      />
    </div>
  );
};

export default memo(SecondaryInfo);
