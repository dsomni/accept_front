import { IMenuLink } from '@custom-types/ui/IMenuLink';
import { useLocale } from '@hooks/useLocale';
import LeftMenu from '@ui/LeftMenu/LeftMenu';
import { FC, memo, useMemo } from 'react';
import {
  AlphabetCyrillic,
  UserPlus,
  Users,
} from 'tabler-icons-react';
import AddUsers from './AddUsers/AddUsers';
import AddUser from './AddUser/AddUser';
import styles from './adminDashboard.module.css';
import AddGrade from './AddGrade/AddGrade';

const AdminDashboard: FC<{}> = ({}) => {
  const { locale } = useLocale();

  const links: IMenuLink[] = useMemo(
    () => [
      {
        page: <AddUsers />,
        icon: <Users color="var(--secondary)" />,
        title: locale.dashboard.admin.addUsers,
      },
      {
        page: <AddUser />,
        icon: <UserPlus color="var(--secondary)" />,
        title: locale.dashboard.admin.addUser,
      },
      {
        page: <AddGrade />,
        icon: <AlphabetCyrillic color="var(--secondary)" />,
        title: locale.dashboard.admin.addGrade,
      },
    ],
    [locale]
  );
  return (
    <div className={styles.lol}>
      <LeftMenu initialStep={2} links={links} />
    </div>
  );
};

export default memo(AdminDashboard);
