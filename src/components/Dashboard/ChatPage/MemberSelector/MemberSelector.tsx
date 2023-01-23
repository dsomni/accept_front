import { FC, memo, useEffect, useState } from 'react';
import styles from './MemberSelector.module.css';
import { IUserDisplay } from '@custom-types/data/IUser';
import { sendRequest } from '@requests/request';
import { UserSelect } from '@ui/selectors';
import { useLocale } from '@hooks/useLocale';

const MemberSelector: FC<{
  entity: string;
  type: 'tournament' | 'assignment';
  opened: boolean;
  exclude: string[];
}> = ({ entity, type, opened, exclude }) => {
  const { locale } = useLocale();
  const [users, setUsers] = useState<IUserDisplay[]>([]);

  useEffect(() => {
    if (!opened) return;
    sendRequest<string[], IUserDisplay[]>(
      `${type}/participants/list/${entity}`,
      'POST',
      exclude
    ).then((res) => {
      if (!res.error) {
        setUsers(res.response);
      }
    });
  }, [opened, type, entity, exclude]);

  return (
    <>
      <div className={styles.placeholder}>{}</div>
      <UserSelect
        label={locale.dashboard.chat.userModal.label}
        placeholder={locale.dashboard.chat.userModal.placeholder}
        nothingFound={locale.dashboard.chat.userModal.nothingFound}
        users={users}
        select={(user: IUserDisplay) => {
          console.log(user);
        }}
      />
    </>
  );
};

export default memo(MemberSelector);
