import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import {
  CustomTransferList,
  Item,
} from '@ui/CustomTransferList/CustomTransferList';
import styles from './userSelector.module.css';
import { IUserDisplay } from '@custom-types/data/IUser';
import { Icon, InputWrapper, SegmentedControl } from '@ui/basics';
import { Eye } from 'tabler-icons-react';
import inputStyles from '@styles/ui/input.module.css';

const UserSelector: FC<{
  setFieldValue: (_: string[]) => void;
  inputProps: any;
  users: IUserDisplay[];
  initialUsers?: string[];
  classNames?: object;
  shrink?: boolean;
}> = ({
  setFieldValue,
  inputProps,
  users,
  initialUsers,
  classNames,
  shrink,
}) => {
  const { locale } = useLocale();

  const initialUsersInner = useMemo(() => initialUsers, []); //eslint-disable-line

  const [availableUsers, selectedUsers] = useMemo(() => {
    let newAvailableUsers = [];
    let newSelectedUsers = [];

    for (let i = 0; i < users.length; i++) {
      if (
        initialUsersInner &&
        initialUsersInner.find((login) => login === users[i].login)
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
    return [newAvailableUsers, newSelectedUsers];
  }, [initialUsersInner, users]);

  const [displayedField, setDisplayedField] = useState<
    'shortName' | 'login'
  >('shortName');

  const itemComponent = useCallback(
    (user: IUserDisplay, handleSelect: any) => {
      return (
        <div
          className={`${styles.itemWrapper} ${
            shrink ? inputStyles.shrink : ''
          }`}
        >
          <div
            className={styles.item}
            onClick={() => handleSelect(user)}
          >
            {user[displayedField]}
          </div>
          <div className={styles.actions}>
            <Icon
              href={`/profile/${user.login}`}
              target="_blank"
              tabIndex={5}
              color="var(--primary)"
              variant="transparent"
              size="xs"
            >
              <Eye />
            </Icon>
          </div>
        </div>
      );
    },
    [displayedField, shrink]
  );

  const setUsed = useCallback(
    (users: Item[]) => setFieldValue(users.map((user) => user.login)),
    [setFieldValue]
  );

  return (
    <div>
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
      <InputWrapper shrink={shrink} {...inputProps}>
        <CustomTransferList
          defaultOptions={availableUsers}
          defaultChosen={selectedUsers}
          setUsed={setUsed}
          classNames={classNames ? classNames : {}}
          titles={[
            locale.ui.userSelector.unselected,
            locale.ui.userSelector.selected,
          ]}
          itemComponent={itemComponent}
          searchKeys={['login', 'name', 'shortName']}
        />
      </InputWrapper>
    </div>
  );
};

export default memo(UserSelector);
