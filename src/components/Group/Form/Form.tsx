import { pureCallback } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import styles from './form.module.css';
import { sendRequest } from '@requests/request';
import stepperStyles from '@styles/ui/stepper.module.css';
import { IUser } from '@custom-types/data/IUser';
import TextInput from '@ui/TextInput/TextInput';
import Button from '@ui/Button/Button';
import SegmentedControl from '@ui/SegmentedControl/SegmentedControl';
import { IGroup } from '@custom-types/data/IGroup';
import { ActionIcon } from '@mantine/core';
import { Eye } from 'tabler-icons-react';
import InputWrapper from '@ui/InputWrapper/InputWrapper';

const Form: FC<{
  form: any;
  handleSubmit: pureCallback;
  buttonText: string;
  users: IUser[];
}> = ({ form, handleSubmit, buttonText, users }) => {
  const [availableUsers, setAvailableUsers] = useState<Item[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);

  const { locale } = useLocale();

  useEffect(() => {
    if (Object.keys(form.errors).length > 0) {
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }
  }, [form.errors]);

  useEffect(() => {
    setLoading(true);
    const newAvailableUsers = [];
    const newSelectedUsers = [];

    for (let i = 0; i < users.length; i++) {
      if (
        users[i].groups.findIndex(
          (item) => item.spec == form.values.spec
        ) >= 0
      ) {
        newSelectedUsers.push({
          ...users[i],
          label: users[i].shortName,
        });
      } else {
        newAvailableUsers.push({
          ...users[i],
          label: users[i].shortName,
        });
      }
    }
    setAvailableUsers(newAvailableUsers);
    setSelectedUsers(newSelectedUsers);
    setLoading(false);
  }, [form.values.spec, users]);

  const [displayedField, setDisplayedField] = useState<
    'shortName' | 'login'
  >('shortName');

  const itemComponent = useCallback(
    (user: IUser, handleSelect: any) => {
      return (
        <div
          className={styles.itemWrapper}
          onClick={() => handleSelect(user)}
        >
          <div className={styles.nameWrapper}>
            <div className={styles.name}>{user[displayedField]}</div>

            <div className={styles.groups}>
              {user.groups.map(
                (group, index) =>
                  group.name +
                  (index == user.groups.length - 1 ? '' : ', ')
              )}
            </div>
          </div>
          <div className={styles.actions}>
            <ActionIcon<'a'>
              component="a"
              href={`/profile/${user.login}`}
              target="_blank"
              tabIndex={5}
              color="var(--primary)"
              variant="hover"
              size="lg"
            >
              <Eye width={20} height={20} />
            </ActionIcon>
          </div>
        </div>
      );
    },
    [displayedField]
  );

  return (
    <div className={stepperStyles.wrapper}>
      <TextInput
        label={locale.group.name}
        classNames={{
          label: stepperStyles.label,
        }}
        required
        onBlur={() => form.validateField('name')}
        {...form.getInputProps('name')}
      />

      <SegmentedControl
        data={[
          {
            label: locale.group.form.login,
            value: 'login',
          },
          {
            label: locale.group.form.shortName,
            value: 'shortName',
          },
        ]}
        value={displayedField}
        onChange={(value) =>
          setDisplayedField(value as 'login' | 'shortName')
        }
      />

      {!loading && (
        <InputWrapper {...form.getInputProps('members')}>
          <CustomTransferList
            defaultOptions={availableUsers}
            defaultChosen={selectedUsers}
            setUsed={(users: Item[]) =>
              form.setFieldValue(
                'members',
                users.map((user) => user.login)
              )
            }
            classNames={{ label: stepperStyles.label }}
            titles={[locale.group.users, locale.group.selectedUsers]}
            itemComponent={itemComponent}
          />
        </InputWrapper>
      )}
      <div className={styles.buttonWrapper}>
        <Button
          color="var(--primary)"
          onClick={handleSubmit}
          disabled={hasErrors}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Form;
