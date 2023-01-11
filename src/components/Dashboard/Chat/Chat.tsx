import { useUser } from '@hooks/useUser';
import { Icon } from '@ui/basics';
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
import { setter } from '@custom-types/ui/atomic';
import io from 'socket.io-client';
import { sendRequest } from '@requests/request';

const Chat: FC<{
  opened: boolean;
  setHasNew: setter<boolean>;
  isMessageMine: (_: IChatMessage) => boolean;
  wsURL: string;
  entity: string;
  host: string;
}> = ({ opened, setHasNew, wsURL, entity, host, isMessageMine }) => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const textArea = useRef<HTMLTextAreaElement>(null);

  const { locale } = useLocale();

  const socket = useMemo(
    () =>
      typeof window !== 'undefined' && user?.login
        ? io(`${process.env.WEBSOCKET_API}`, {
            path: wsURL,
            autoConnect: false,
          })
        : undefined,
    [user?.login, wsURL]
  );

  const fetchMessages = useCallback(() => {
    sendRequest<{}, IChatMessage[]>('chat/new', 'POST', {
      entity,
      host,
    }).then((res) => {
      if (!res.error) {
        setMessages((messages) => [...messages, ...res.response]);
      }
    });
  }, [entity, host]);

  const handleSend = useCallback(() => {
    console.log(message);
    sendRequest<{}, IChatMessage>('chat', 'POST', {
      entity,
      host,
      content: message,
    }).then((res) => {
      if (!res.error) {
        setMessages((messages) => [...messages, res.response]);
      }
    });
  }, [entity, host, message]);

  useEffect(() => {
    sendRequest<{}, IChatMessage[]>('chat/all', 'POST', {
      entity,
      host,
    }).then((res) => {
      if (!res.error) {
        setMessages(res.response);
      }
    });
  }, [entity, host]);

  useEffect(() => {
    if (!socket) return;
    socket.connect();
    socket.on('connect', () =>
      socket.emit('register', entity, host, user?.login)
    );
    socket.on('disconnect', () => {
      // socket.connect();
    });
    socket.on('new_messages', (response) => {
      const shouldRefetch = JSON.parse(response) as boolean;
      if (shouldRefetch) {
        fetchMessages();
        if (!opened) setHasNew(true);
      }
    });

    // Clean-up
    return () => {
      socket.removeAllListeners('connect');
      socket.removeAllListeners('disconnect');
      socket.removeAllListeners('notification');
    };
  }, [socket]); // eslint-disable-line

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
    <div
      className={styles.wrapper}
      style={{ visibility: opened ? 'visible' : 'hidden' }}
    >
      <div className={styles.messages}>
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
