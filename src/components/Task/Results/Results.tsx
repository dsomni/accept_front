import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Table from '@ui/Table/Table';
import { ITableColumn } from '@custom-types/ui/ITable';
import tableStyles from '@styles/ui/customTable.module.css';
import { useLocale } from '@hooks/useLocale';

import { IAttemptDisplay } from '@custom-types/data/IAttempt';
import { ILocale } from '@custom-types/ui/ILocale';
import { getLocalDate } from '@utils/datetime';
import { useUser } from '@hooks/useUser';
import { useRequest } from '@hooks/useRequest';
import { BaseSearch } from '@custom-types/data/request';
import {
  errorNotification,
  newNotification,
} from '@utils/notificationFunctions';
import AttemptList from '@ui/AttemptList/AttemptList';

const Results: FC<{ spec: string; activeTab: string }> = ({
  spec,
  activeTab,
}) => {
  return (
    <AttemptList
      url={`task/attempts/${spec}`}
      activeTab={activeTab === 'results'}
    />
  );
};

export default memo(Results);
