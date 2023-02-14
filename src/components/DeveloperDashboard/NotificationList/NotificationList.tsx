import { FC, memo, useCallback, useMemo, useState } from 'react';
import { useRequest } from '@hooks/useRequest';
import MessageList from '@ui/MessageList/MessageList';
import {
  IListAction,
  IListMessage,
} from '@custom-types/ui/IListMessage';
import { shrinkText } from '@utils/shrinkText';
import { INotificationWithRefs } from '@custom-types/data/notification';
import { Badge } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';
import { Pencil, Trash } from 'tabler-icons-react';
import { setter } from '@custom-types/ui/atomic';
import { requestWithError } from '@utils/requestWithError';
import EditModal from './EditModal/EditModal';

const NotificationList: FC<{}> = ({}) => {
  const { locale, lang } = useLocale();
  const { data, loading, refetch } = useRequest<
    {},
    INotificationWithRefs[]
  >('notification/dev/all', 'GET');
  const messages = useMemo(
    () =>
      (data || []).map(
        (item) =>
          ({
            ...item,
            spec: item.spec,
            author: item.author,
            date: item.date,
            message: item.description,
            subject: item.shortDescription,
            title: item.title,
          } as IListMessage)
      ),
    [data]
  );
  const [openedModal, setOpenedModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const handleDelete = useCallback(
    (selected: string[], setSelected: setter<string[]>) => {
      requestWithError<string[], boolean>(
        'notification/dev/delete',
        'DELETE',
        locale.notification.list.requestDelete,
        lang,
        selected,
        () => {
          refetch();
          setSelected([]);
        }
      );
    },
    [lang, locale, refetch]
  );

  const disabledEdit = useCallback(
    (selected: string[]) => selected.length > 1,
    []
  );

  const handleEdit = useCallback(
    (selected: string[], setSelected: setter<string[]>) => {
      setOpenedModal(true);
      setEditIndex(
        data?.findIndex((item) => item.spec == selected[0]) || 0
      );
      setSelected([]);
    },
    [data]
  );

  const actions: IListAction[] = useMemo(
    () => [
      {
        icon: <Trash />,
        tooltipLabel: locale.notification.list.delete,
        onClick: handleDelete,
      },
      {
        icon: <Pencil />,
        tooltipLabel: locale.notification.list.edit,
        onClick: handleEdit,
        disabled: disabledEdit,
      },
    ],
    [handleDelete, locale, disabledEdit, handleEdit]
  );

  return (
    <>
      {data && data[editIndex] && (
        <EditModal
          key={editIndex}
          notification={data[editIndex]}
          opened={openedModal}
          close={(needRefetch: boolean) => {
            setOpenedModal(false);
            if (needRefetch) {
              refetch();
            }
          }}
        />
      )}
      <MessageList
        actions={actions}
        emptyMessage={locale.profile.empty.notification}
        loading={loading}
        messageTitle={(message: IListMessage) => {
          return (
            <>
              {shrinkText(message.title, 48)}
              {
                //@ts-ignore
                <Badge color="green">{message.references}</Badge>
              }
            </>
          );
        }}
        messages={messages}
        refetch={() => refetch(false)}
        handleViewed={() => {}}
        rowClassName={(_: IListMessage) => ''}
      />
    </>
  );
};

export default memo(NotificationList);
