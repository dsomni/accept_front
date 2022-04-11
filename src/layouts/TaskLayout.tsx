import Sticky from '@ui/Sticky/Sticky';
import DeleteModal from '@components/Task/DeleteModal/DeleteModal';
import { useLocale } from '@hooks/useLocale';
import { Tabs } from '@mantine/core';
import { capitalize } from '@utils/capitalize';
import { FC, memo, ReactNode, useState } from 'react';

const TaskLayout: FC<{
  description: ReactNode;
  send: ReactNode;
  results: ReactNode;
}> = ({ description, send, results }) => {
  const { locale } = useLocale();

  return (
    <>
      <Tabs grow style={{ width: '100%', height: '100%' }}>
        <Tabs.Tab label={capitalize(locale.tasks.description.self)}>
          {description}
        </Tabs.Tab>
        <Tabs.Tab label={capitalize(locale.tasks.send)}>
          {send}
        </Tabs.Tab>
        <Tabs.Tab label={capitalize(locale.tasks.results)}>
          {results}
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default memo(TaskLayout);
