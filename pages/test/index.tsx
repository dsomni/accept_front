import { DefaultLayout } from '@layouts/DefaultLayout';
import { Button } from '@ui/basics';
import { openText } from '@utils/openText';
import { ReactElement, useCallback } from 'react';

function TestPage() {
  const onClick = useCallback(() => {
    openText('lol '.repeat(5000));
  }, []);

  return <Button onClick={onClick}>open text</Button>;
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
