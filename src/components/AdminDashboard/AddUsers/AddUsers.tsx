import { Button, Dropzone } from '@ui/basics';
import { MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { getAddUserData } from '@utils/readExcel';
import NewUsersList from '@ui/NewUsersList/NewUsersList';
import { ITableColumn } from '@custom-types/ui/ITable';
import { ILocale } from '@custom-types/ui/ILocale';
import { useLocale } from '@hooks/useLocale';
import { requestWithNotify } from '@utils/requestWithNotify';
import {
  IStudentAdd,
  IStudentAddResponse,
} from '@custom-types/data/IStudent';

const initialColumns = (locale: ILocale): ITableColumn[] => [
  {
    label: locale.users.list.login,
    key: 'login',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.login > b.login ? 1 : a.login == b.login ? 0 : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 2,
  },
  {
    label: locale.users.list.fullName,
    key: 'fullName',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.fullName > b.fullName ? 1 : a.fullName == b.fullName ? 0 : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 3,
  },
  {
    label: locale.users.list.grade,
    key: 'grade',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      +a.grade.slice(0, -1) > +b.grade.slice(0, -1)
        ? 1
        : +a.grade.slice(0, -1) == +b.grade.slice(0, -1)
        ? a.grade[-1] > b.grade[-1]
          ? 1
          : 0
        : -1,
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: false,
    size: 1,
  },
  {
    label: locale.users.list.password,
    key: 'password',
    sortable: false,
    sortFunction: (_: any, __: any) => 0,
    sorted: 0,
    allowMiddleState: true,
    hidable: true,
    hidden: true,
    size: 2,
  },
];

const AddUsers: FC<{}> = ({}) => {
  const [users, setUsers] = useState<IStudentAdd[]>([]);
  const [errors, setErrors] = useState<IStudentAddResponse[]>([]);
  const { locale, lang } = useLocale();
  const onDrop = useCallback(async (files: any[]) => {
    const file = await files[0].arrayBuffer();
    const data = getAddUserData(file);
    setUsers(data as IStudentAdd[]);
    setErrors([]);
  }, []);

  const handleSend = useCallback(() => {
    requestWithNotify<IStudentAdd[], IStudentAddResponse[]>(
      'students/add',
      'POST',
      locale.notify.students.add,
      lang,
      (resp) =>
        `Пользователей с ошибками: ${
          resp.filter((item) => item.message.kind === 'error').length
        }`,
      users,
      (resp) => {
        setUsers([]);
        setErrors(resp);
      }
    );
  }, [users, lang, locale]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      {users.length > 0 && (
        <Button onClick={handleSend} color={'var(--positive)'}>
          {locale.add}
        </Button>
      )}
      <Dropzone
        onDrop={onDrop}
        title={''}
        description={''}
        accept={MS_EXCEL_MIME_TYPE.reverse()}
        buttonProps={{ style: { marginBottom: 'var(--spacer-m)' } }}
        showButton
      >
        <NewUsersList
          data={users}
          initialColumns={initialColumns}
          empty={<div>Перетащите файл сюда</div>}
          noDefault
        />
      </Dropzone>
    </>
  );
};

export default memo(AddUsers);
