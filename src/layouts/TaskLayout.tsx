import { callback } from '@custom-types/ui/atomic';
import { useLocale } from '@hooks/useLocale';
import { Tabs } from '@mantine/core';
import Head from 'next/head';

import { FC, memo, ReactNode, useState } from 'react';

const TaskLayout: FC<{
  description: ReactNode;
  send?: callback<any, ReactNode>;
  results?: ReactNode;
  title?: string;
}> = ({ description, send, results, title }) => {
  const { locale } = useLocale();

  const [activeTab, setActiveTab] = useState<string | null>(
    'description'
  );

  return (
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      {results || send ? (
        <Tabs
          style={{
            width: '100%',
            height: '100%',
          }}
          styles={{ tabLabel: { fontSize: 'var(--font-size-s)' } }}
          value={activeTab}
          onTabChange={setActiveTab}
        >
          <Tabs.List grow>
            <Tabs.Tab value="description">
              {locale.task.description.self}
            </Tabs.Tab>
            {send && (
              <Tabs.Tab value="send">{locale.task.send}</Tabs.Tab>
            )}
            {results && (
              <Tabs.Tab value="results">
                {locale.task.results}
              </Tabs.Tab>
            )}
          </Tabs.List>

          <Tabs.Panel value="description" pt="xs">
            {description}
          </Tabs.Panel>

          {send && (
            <Tabs.Panel value="send" pt="xs">
              {send(setActiveTab)}
            </Tabs.Panel>
          )}

          <Tabs.Panel value="results" pt="xs">
            {results}
          </Tabs.Panel>
        </Tabs>
      ) : (
        <>{description}</>
      )}
    </>
  );
};

export default memo(TaskLayout);
