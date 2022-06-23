import { useLocale } from '@hooks/useLocale';
import { Tabs } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, ReactNode } from 'react';

const TaskLayout: FC<{
  description: ReactNode;
  send?: ReactNode;
  results?: ReactNode;
}> = ({ description, send, results }) => {
  const { locale } = useLocale();

  return (
    <>
      {results && send ? (
        <Tabs
          grow
          style={{
            width: '100%',
            height: '100%',
          }}
          styles={{ tabLabel: { fontSize: 'var(--font-size-m)' } }}
        >
          <Tabs.Tab label={capitalize(locale.tasks.description.self)}>
            {description}
          </Tabs.Tab>
          {send && (
            <Tabs.Tab label={capitalize(locale.tasks.send)}>
              {send}
            </Tabs.Tab>
          )}
          {results && (
            <Tabs.Tab label={capitalize(locale.tasks.results)}>
              {results}
            </Tabs.Tab>
          )}
        </Tabs>
      ) : (
        <>{description}</>
      )}
    </>
  );
};

export default memo(TaskLayout);
