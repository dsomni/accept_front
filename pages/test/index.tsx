import CustomEditor from '@ui/CustomEditor/CustomEditor';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { FC, ReactElement, useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { defaultClassNames } from '@constants/NotificationClassNames';

function TestPage() {
  useEffect(() => {
    setTimeout(() => {
      showNotification({
        title: '123',
        message:
          '123 1 1234 1 12345 123456789 12 123456 12345 123 12345 123456789',
        autoClose: false,
        classNames: defaultClassNames,
      });
    }, 1000);
  }, []);

  return <></>;
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
