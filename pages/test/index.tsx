import { DefaultLayout } from '@layouts/DefaultLayout';
import { ReactElement, useCallback } from 'react';
import { sendRequest } from '@requests/request';
import { IGroup } from '@custom-types/data/IGroup';
import { Button } from '@ui/basics';

const letters = ['А', 'Б', 'В', 'Г', 'Д'];

function TestPage() {
  const createGroups = useCallback(() => {
    for (let index = 5; index < 12; index++) {
      for (let letter = 0; letter < letters.length; letter++) {
        let name = `${index} ${letters[letter]}`;
        sendRequest<{ group: IGroup; members: string[] }, boolean>(
          'group/add',
          'POST',
          {
            group: { spec: '', name, readonly: true },
            members: [],
          }
        );
      }
    }
  }, []);
  return (
    <>
      <Button onClick={createGroups}>Создать группы</Button>
    </>
  );
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
