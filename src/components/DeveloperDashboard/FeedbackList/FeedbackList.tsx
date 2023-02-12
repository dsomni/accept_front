import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { sendRequest } from '@requests/request';
import { IFeedbackMessage } from '@custom-types/data/IFeedbackMessage';
import MessageList from '@ui/MessageList/MessageList';
import {
  IListAction,
  IListMessage,
} from '@custom-types/ui/IListMessage';
import { shrinkText } from '@utils/shrinkText';
import { Badge } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';
import { MailOpened, Trash } from 'tabler-icons-react';
import { requestWithError } from '@utils/requestWithError';
import { setter } from '@custom-types/ui/atomic';
import styles from './feedbackList.module.css';

const FeedbackList: FC<{}> = ({}) => {
  const { locale, lang } = useLocale();
  const [feedbacks, setFeedbacks] = useState<IFeedbackMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cleanUp = false;
    setLoading(true);
    sendRequest<{}, IFeedbackMessage[]>('feedback', 'GET').then(
      (res) => {
        if (!res.error && !cleanUp) {
          setFeedbacks(res.response);
        }
        setLoading(false);
      }
    );
    return () => {
      cleanUp = true;
    };
  }, []);

  const refetchFeedback = useCallback(() => {
    sendRequest<{}, IFeedbackMessage[]>('feedback', 'GET').then(
      (res) => {
        if (!res.error) {
          setFeedbacks(res.response);
        }
      }
    );
  }, []);

  const handleDelete = useCallback(
    (selected: string[], setSelected: setter<string[]>) => {
      requestWithError<string[], boolean>(
        'feedback/delete',
        'DELETE',
        locale.feedback.list.requestDelete,
        lang,
        selected,
        () => {
          setTimeout(refetchFeedback, 200);
          setSelected([]);
        }
      );
    },
    [locale, lang, refetchFeedback]
  );

  const sendViewed = useCallback(
    (viewed: string[], callback: () => void) => {
      requestWithError<string[], boolean>(
        'feedback/reviewed',
        'POST',
        locale.feedback.list.requestViewed,
        lang,
        viewed,
        callback
      );
    },
    [lang, locale]
  );

  const handleView = useCallback(
    (selected: string[], setSelected: setter<string[]>) => {
      sendViewed(selected, () => {
        setTimeout(refetchFeedback, 200);
        setSelected([]);
      });
    },
    [refetchFeedback, sendViewed]
  );

  const handleViewed = useCallback(
    (viewed: string[]) => {
      sendViewed(viewed, () => {
        setTimeout(refetchFeedback, 200);
      });
    },
    [sendViewed, refetchFeedback]
  );

  const messages = useMemo(
    () =>
      feedbacks.map(
        (item) =>
          ({
            ...item,
            message: item.message,
            title: item.subject,
          } as IListMessage)
      ),
    [feedbacks]
  );

  const actions: IListAction[] = useMemo(
    () => [
      {
        icon: <MailOpened />,
        tooltipLabel: locale.notification.list.viewed,
        onClick: handleView,
      },
      {
        icon: <Trash />,
        tooltipLabel: locale.notification.list.delete,
        onClick: handleDelete,
      },
    ],
    [
      handleDelete,
      handleView,
      locale.notification.list.delete,
      locale.notification.list.viewed,
    ]
  );

  return (
    <MessageList
      messages={messages}
      actions={actions}
      messageTitle={(feedback: IListMessage) => {
        return (
          <>
            {shrinkText(feedback.title, 48)}
            {
              //@ts-ignore
              !feedback.reviewed && (
                <Badge color="green">{locale.new}</Badge>
              )
            }
          </>
        );
      }}
      rowClassName={(feedback: IListMessage) =>
        //@ts-ignore
        !feedback.reviewed ? styles.new : ''
      }
      refetch={refetchFeedback}
      emptyMessage={locale.profile.empty.notification}
      loading={loading}
      handleViewed={handleViewed}
    />
  );
};

export default memo(FeedbackList);
