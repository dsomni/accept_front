import { callback } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { Tabs } from '@mantine/core';

import { FC, memo, ReactNode, useState } from 'react';

const TaskLayout: FC<{
  description: ReactNode;
  send?: callback<any, ReactNode>;
  results?: ReactNode;
}> = ({ description, send, results }) => {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      {results && send ? (
        <Tabs
          grow
          style={{
            width: '100%',
            height: '100%',
          }}
          styles={{ tabLabel: { fontSize: 'var(--font-size-s)' } }}
          active={activeTab}
          onTabChange={setActiveTab}
        >
          <Tabs.Tab label={locale.task.description.self}>
            {description}
          </Tabs.Tab>
          {send && (
            <Tabs.Tab label={locale.task.send}>
              {send(setActiveTab)}
            </Tabs.Tab>
          )}
          {results && (
            <Tabs.Tab label={locale.task.results}>{results}</Tabs.Tab>
          )}
        </Tabs>
      ) : (
        <>{description}</>
      )}
    </>
  );
};

export default memo(TaskLayout);
