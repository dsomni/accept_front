import { Helper } from '@ui/Helper/Helper';
import { InfoButton } from '@ui/InfoButton/InfoButton';
import { DefaultLayout } from '@layouts/DefaultLayout';
import { Button } from '@mantine/core';
import { ReactElement, useCallback } from 'react';

function TestPage() {
  return <></>;
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
