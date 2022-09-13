import { IMenuLink } from '@custom-types/ui/IMenuLink';
import { useLocale } from '@hooks/useLocale';
import LeftMenu from '@ui/LeftMenu/LeftMenu';
import { FC, memo, useMemo } from 'react';
import { UserPlus } from 'tabler-icons-react';
import AddUsers from './AddUsers/AddUsers';
import styles from './adminDashboard.module.css';

const AdminDashboard: FC<{}> = ({}) => {
  const { locale } = useLocale();

  const links: IMenuLink[] = useMemo(
    () => [
      {
        page: <AddUsers />,
        icon: <UserPlus color="var(--secondary)" />,
        title: locale.dashboard.admin.addUsers,
      },
    ],
    [locale]
  );
  return (
    <div className={styles.lol}>
      <LeftMenu links={links} />
    </div>
  );
};

export default memo(AdminDashboard);
