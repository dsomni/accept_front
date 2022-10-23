import { useLocale } from '@hooks/useLocale';
import { FC, memo, useCallback, useEffect, useState } from 'react';
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
  const [availableUsers, setAvailableUsers] = useState<Item[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const { locale } = useLocale();

  useEffect(() => {
    setLoading(true);
    let newAvailableUsers = [];
    let newSelectedUsers = [];

    for (let i = 0; i < users.length; i++) {
      if (
        initialUsers &&
        initialUsers.find((login) => login === users[i].login)
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
  }, [initialUsers, users]);

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
          onClick={() => handleSelect(user)}
        >
          <div>{user[displayedField]}</div>
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

      {!loading && (
        <InputWrapper shrink={shrink} {...inputProps}>
          <CustomTransferList
            defaultOptions={availableUsers}
            defaultChosen={selectedUsers}
            setUsed={(users: Item[]) =>
              setFieldValue(users.map((user) => user.login))
            }
            classNames={classNames ? classNames : {}}
            titles={[
              locale.ui.userSelector.unselected,
              locale.ui.userSelector.selected,
            ]}
            itemComponent={itemComponent}
            searchKeys={['login', 'name', 'shortName']}
          />
        </InputWrapper>
      )}
    </div>
  );
};

export default memo(UserSelector);
