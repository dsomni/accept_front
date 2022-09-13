import {
  Button,
  Dropzone,
  Helper,
  SegmentedControl,
} from '@ui/basics';
import { MS_EXCEL_MIME_TYPE } from '@mantine/dropzone';
import { FC, memo, useCallback, useState } from 'react';
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
import StudentErrorList, {
  IStudentAddResponseTable,
} from '@ui/StudentErrorList/StudentErrorList';
import styles from './addUsers.module.css';

const usersInitialColumns = (locale: ILocale): ITableColumn[] => [
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

const errorsInitialColumns = (locale: ILocale): ITableColumn[] => [
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
    label: locale.users.list.error,
    key: 'error',
    sortable: true,
    sortFunction: (a: any, b: any) =>
      a.message.type === 'error' && b.message.type !== 'error'
        ? 1
        : a.message.type !== 'error' && b.message.type === 'error'
        ? -1
        : 0,
    sorted: 1,
    allowMiddleState: true,
    hidable: false,
    hidden: false,
    size: 2,
  },
];

// @ts-ignore-line
let reverse = (a: string[]): string[] => [...a].map(a.pop, a);

const ACCEPTED = reverse(MS_EXCEL_MIME_TYPE);

const AddUsers: FC<{}> = ({}) => {
  const { locale, lang } = useLocale();
  const [users, setUsers] = useState<IStudentAdd[]>([]);
  const [errors, setErrors] = useState<IStudentAddResponseTable[]>(
    []
  );
  const [table, setTable] = useState<'users' | 'errors'>('users');

  const onDrop = useCallback(async (files: any[]) => {
    const file = await files[0].arrayBuffer();
    const data = getAddUserData(file);
    setUsers(data as IStudentAdd[]);
    setErrors([]);
    setTable('users');
  }, []);

  const handleSend = useCallback(() => {
    requestWithNotify<IStudentAdd[], IStudentAddResponse[]>(
      'students/add',
      'POST',
      locale.notify.students.add,
      lang,
      (resp) =>
        `${locale.student.add.error}: ${
          resp.filter((item) => item.message.kind === 'error').length
        }`,
      users,
      (resp) => {
        setErrors(
          resp.map((item) => ({
            ...item,
            error: {
              value: item.message.kind,
              display: (
                <div className={styles.errorWrapper}>
                  <div
                    className={styles.error}
                    style={{
                      color:
                        item.message.kind == 'error'
                          ? 'var(--negative)'
                          : 'var(--neutral)',
                    }}
                  >
                    {locale.student.errors[item.message.kind]}
                  </div>
                  <Helper
                    hoverCardProps={{ arrowSize: 15 }}
                    dropdownContent={item.message.text[lang]}
                  />
                </div>
              ),
            },
          }))
        );
        if (resp.length !== 0) setTable('errors');
      }
    );
  }, [users, lang, locale]);

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        title={''}
        description={''}
        accept={ACCEPTED}
        buttonProps={{ style: { marginBottom: 'var(--spacer-m)' } }}
        showButton
        additionalButtons={
          <>
            {users.length > 0 && (
              <Button onClick={handleSend} color={'var(--positive)'}>
                {locale.add}
              </Button>
            )}
          </>
        }
      >
        <div className={styles.tableWrapper}>
          {errors.length > 0 && (
            <div className={styles.segmentControl}>
              <SegmentedControl
                value={table}
                onChange={(value) =>
                  setTable(value as 'users' | 'errors')
                }
                data={[
                  {
                    label: locale.student.segments.users,
                    value: 'users',
                  },
                  {
                    label: locale.student.segments.errors,
                    value: 'errors',
                  },
                ]}
              />
              <Helper
                hoverCardProps={{ arrowSize: 15 }}
                dropdownContent={
                  <div>
                    {locale.helpers.student.errors.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                }
              />
            </div>
          )}
          {table != 'errors' && (
            <NewUsersList
              data={users}
              initialColumns={usersInitialColumns}
              empty={<div>Перетащите файл сюда</div>}
              noDefault
            />
          )}
          {table == 'errors' && (
            <StudentErrorList
              data={errors}
              initialColumns={errorsInitialColumns}
              empty={<div>Перетащите файл сюда</div>}
              noDefault
            />
          )}
        </div>
      </Dropzone>
    </>
  );
};

export default memo(AddUsers);
