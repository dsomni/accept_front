import { useUser } from '@hooks/useUser';
import { Icon, LoadingOverlay } from '@ui/basics';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Send } from 'tabler-icons-react';
import styles from './chat.module.css';
import { IChatMessage } from '@custom-types/data/IMessage';
import { Textarea } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';
import { getLocalDate } from '@utils/datetime';
import io from 'socket.io-client';
import { sendRequest } from '@requests/request';

const Chat: FC<{
  indicateNew?: () => void;
  opened: boolean;
  isMessageMine: (_: IChatMessage) => boolean;
  wsURL: string;
  entity: string;
  host: string;
  wrapperStyles: any;
  moderator?: boolean;
}> = ({
  indicateNew,
  opened,
  wsURL,
  entity,
  host,
  isMessageMine,
  wrapperStyles,
  moderator,
}) => {
  const { locale } = useLocale();
  const { user } = useUser();

  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  const textArea = useRef<HTMLTextAreaElement>(null);
  const messagesDiv = useRef<HTMLDivElement>(null!);
  const [firstFetchDone, setFirstFetchDone] = useState(false);
  const [newMessages, setNewMessages] = useState<string[]>([]);

  const socket = useMemo(
    () =>
      typeof window !== 'undefined' && user?.login
        ? io(`${process.env.WEBSOCKET_API}`, {
            path: wsURL,
            transports: ['polling'],
          })
        : undefined,
    [user?.login, wsURL]
  );

  const appendMessages = useCallback((messages: IChatMessage[]) => {
    setMessages((oldMessages) => [...oldMessages, ...messages]);
    setNewMessages((oldMessages) => [
      ...oldMessages,
      ...messages.map((item) => item.spec),
    ]);
    setTimeout(() => {
      if (messagesDiv.current)
        messagesDiv.current.scrollTop =
          messagesDiv.current.scrollHeight;
    }, 100);
  }, []);

  const fetchMessages = useCallback(() => {
    setInitialLoad(true);
    sendRequest<{}, IChatMessage[]>('chat/new', 'POST', {
      entity,
      host,
      moderator: !!moderator,
    }).then((res) => {
      if (!res.error) {
        appendMessages(res.response);
      }
      setInitialLoad(false);
    });
  }, [entity, host, moderator, appendMessages]);

  const handleSend = useCallback(() => {
    if (message.trim() === '') return;
    sendRequest<{}, IChatMessage>('chat', 'POST', {
      entity,
      host,
      moderator: !!moderator,
      content: message,
    }).then((res) => {
      if (!res.error) {
        appendMessages([res.response]);
        setMessage('');
      }
    });
  }, [entity, host, moderator, message, appendMessages]);

  useEffect(() => {
    if (opened && newMessages.length > 0)
      sendRequest<{}, boolean>('/chat/viewed', 'POST', {
        specs: newMessages,
        entity,
        moderator: !!moderator,
      }).then(() => setNewMessages([]));
  }, [opened, newMessages, entity, moderator]);

  useEffect(() => {
    if (firstFetchDone || !opened) return;
    setFirstFetchDone(true);
    setInitialLoad(true);
    sendRequest<{}, IChatMessage[]>('chat/all', 'POST', {
      entity,
      host,
      moderator: !!moderator,
    }).then((res) => {
      if (!res.error) {
        setMessages(res.response);
        setTimeout(() => {
          if (messagesDiv.current) {
            messagesDiv.current.style.scrollBehavior = 'auto';
            messagesDiv.current.scrollTop =
              messagesDiv.current.scrollHeight;
            messagesDiv.current.style.scrollBehavior = 'smooth';
          }
          setInitialLoad(false);
        }, 100);
      }
    });
  }, [entity, host, moderator, opened, firstFetchDone]);

  useEffect(() => {
    if (!socket || !user) return;
    socket.connect();
    socket.on('connect', () =>
      socket.emit('register', entity, host, user?.login, !!moderator)
    );
    socket.on('disconnect', () => {
      // socket.connect();
    });
    socket.on('new_messages', (response) => {
      const shouldRefetch = JSON.parse(response) as boolean;
      if (shouldRefetch) {
        fetchMessages();
        if (indicateNew) indicateNew();
      }
    });

    // Clean-up
    return () => {
      socket.removeAllListeners('connect');
      socket.removeAllListeners('disconnect');
      socket.removeAllListeners('new_messages');
      socket.disconnect();
    };
  }, [
    socket,
    fetchMessages,
    entity,
    host,
    indicateNew,
    moderator,
    user,
  ]);

  useEffect(() => {
    const handleClick = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    };
    const ref = textArea.current;
    if (ref) {
      ref.addEventListener('keydown', handleClick);
    }
    return () => {
      if (ref) ref.removeEventListener('keydown', handleClick);
    };
  }, [textArea, handleSend]);

  return (
    <div className={wrapperStyles}>
      <div ref={messagesDiv} className={styles.messages}>
        <LoadingOverlay visible={initialLoad} />
        {messages.map((message, index) => (
          <div
            className={`${styles.messageWrapper} ${
              isMessageMine(message) ? styles.own : ''
            }`}
            key={index}
          >
            <div className={styles.message}>
              <div className={styles.user}>{message.author}</div>

              <div className={styles.content}>{message.content}</div>
              <div className={styles.date}>
                {getLocalDate(message.date)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.sendWrapper}>
        <Textarea
          className={styles.input}
          ref={textArea}
          styles={{
            root: {
              width: '100%',
              height: '100%',
              padding: 0,
            },
            wrapper: { height: '100%' },
            input: {
              height: '100%',
              border: 'none',
              fontSize: 'var(--font-size-s)',
            },
          }}
          classNames={{
            input: styles.textInput,
          }}
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          placeholder={locale.placeholders.chat}
          minRows={1}
          maxRows={3}
          autosize
        />
        <Icon
          className={styles.button}
          onClick={handleSend}
          size={'sm'}
          color="var(--primary)"
          wrapperClassName={styles.iconWrapper}
        >
          <Send />
        </Icon>
      </div>
    </div>
  );
};

export default memo(Chat);
