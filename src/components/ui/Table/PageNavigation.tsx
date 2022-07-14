import { useLocale } from '@hooks/useLocale';
import { ActionIcon } from '@mantine/core';
import Select from '@ui/Select/Select';
import { capitalize } from '@utils/capitalize';
import { FC, memo, useMemo } from 'react';
import {
  ArrowNarrowLeft,
  ArrowNarrowRight,
  ChevronLeft,
  ChevronRight,
} from 'tabler-icons-react';
import styles from './table.module.css';

const PageNavigation: FC<{
  onPage: number[];
  defaultOnPage: number;
  perPage: number;
  page: number;
  totalLength: number;
  handlePerPageChange: (perPage: number) => void;
  handlePageChange: (page: number) => void;
}> = ({
  onPage,
  page,
  perPage,
  defaultOnPage,
  totalLength,
  handlePerPageChange,
  handlePageChange,
}) => {
  const { locale } = useLocale();
  const lastPage = useMemo(
    () => Math.ceil(totalLength / (perPage || totalLength || 1)) - 1,
    [totalLength, perPage]
  );

  return (
    <div className={styles.footer}>
      <div className={styles.pagesWrapper}>
        <div className={styles.overall}>
          {capitalize(locale.table.overall)} {totalLength}
        </div>
        {totalLength > 0 && (
          <div className={styles.pageNavigationWrapper}>
            <div className={styles.perPageWrapper}>
              <div className={styles.perPage}>
                {capitalize(locale.table.perPage) + ':'}{' '}
              </div>
              <Select
                data={onPage
                  .map((value) => ({
                    label: value.toString(),
                    value: value.toString(),
                  }))
                  .concat({
                    label: capitalize(locale.all),
                    value: '0',
                  })}
                classNames={{
                  input: styles.selectPerPage,
                }}
                defaultValue={defaultOnPage.toString()}
                onChange={(value) =>
                  handlePerPageChange(Number(value))
                }
              />
            </div>

            <div className={styles.pageNavigation}>
              <ActionIcon
                style={{
                  backgroundColor: '#ffffff00',
                  border: 'none',
                }}
                disabled={page == 0}
                onClick={() => handlePageChange(0)}
              >
                <ArrowNarrowLeft />
              </ActionIcon>
              <ActionIcon
                style={{
                  backgroundColor: '#ffffff00',
                  border: 'none',
                }}
                disabled={page == 0}
                onClick={() =>
                  handlePageChange(Math.max(page - 1, 0))
                }
              >
                <ChevronLeft />
              </ActionIcon>
              <div>
                {page * perPage + 1} -{' '}
                {perPage
                  ? Math.min((page + 1) * perPage, totalLength)
                  : totalLength}
              </div>
              <ActionIcon
                style={{
                  backgroundColor: '#ffffff00',
                  border: 'none',
                }}
                disabled={page == lastPage}
                onClick={() =>
                  handlePageChange(Math.min(page + 1, lastPage))
                }
              >
                <ChevronRight />
              </ActionIcon>
              <ActionIcon
                style={{
                  backgroundColor: '#ffffff00',
                  border: 'none',
                }}
                disabled={page == lastPage}
                onClick={() => handlePageChange(lastPage)}
              >
                <ArrowNarrowRight />
              </ActionIcon>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PageNavigation);
