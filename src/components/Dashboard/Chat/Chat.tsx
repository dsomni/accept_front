import { useUser } from '@hooks/useUser';
import { Icon } from '@ui/basics';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Send } from 'tabler-icons-react';
import styles from './chat.module.css';
import { IMessage } from '@custom-types/data/IMessage';
import { Textarea } from '@mantine/core';
import { useLocale } from '@hooks/useLocale';
import { getLocalDate } from '@utils/datetime';
import { setter } from '@custom-types/ui/atomic';

const Chat: FC<{
  spec: string;
  opened: boolean;
  setHasNew: setter<boolean>;
}> = ({ spec, opened, setHasNew }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const messagesDiv = useRef<HTMLDivElement>(null!);
  const [justSend, setJustSend] = useState(true);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const { locale } = useLocale();

  useEffect(() => {
    if (!user) return;
    const ws = new WebSocket(
      `ws://${
        process.env.API_ENDPOINT?.split('://')[1]
      }/ws/chat/${spec}/${user?.login}`
    );

    setWebSocket(ws);

    return () => {
      ws.close();
    };
  }, [spec, user]);

  useEffect(() => {
    if (webSocket) {
      webSocket.onmessage = (event) => {
        if (!opened) {
          setHasNew(true);
        }
        setMessages((messages) => {
          return [...messages, JSON.parse(event.data)];
        });
        setTimeout(() => {
          if (justSend && messagesDiv.current) {
            messagesDiv.current.scrollTop =
              messagesDiv.current.scrollHeight;
            setJustSend(false);
          }
        }, 100);
      };
    }
  }, [justSend, webSocket, setHasNew, opened]);

  const handleSend = useCallback(() => {
    if (
      webSocket &&
      webSocket.readyState === 1 &&
      message.trim().length > 0
    ) {
      webSocket.send(message.trim());
    }
    setJustSend(true);
    setMessage('');
  }, [webSocket, message]);

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
      <div ref={messagesDiv} className={styles.messages}>
        {messages.map((message, index) => (
          <div
            className={`${styles.messageWrapper} ${
              message.user.login === user?.login ? styles.own : ''
            }`}
            key={index}
          >
            <div className={styles.message}>
              <div className={styles.user}>
                {message.user.shortName}
              </div>

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
        >
          <Send />
        </Icon>
      </div>
    </div>
  );
};

export default memo(Chat);
