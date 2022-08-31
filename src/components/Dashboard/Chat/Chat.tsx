import { useUser } from '@hooks/useUser';
import { Icon, TextInput } from '@ui/basics';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Send } from 'tabler-icons-react';
import styles from './chat.module.css';
import { IMessage } from '@custom-types/data/IMessage';
import { getLocalDate } from '@utils/datetime';

const Chat: FC<{ spec: string }> = ({ spec }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [message, setMessage] = useState('');
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const ws = new WebSocket(
      `ws://${
        process.env.API_ENDPOINT?.split('://')[1]
      }/ws/chat/${spec}/${user?.login}`
    );

    ws.onmessage = (event) => {
      setMessages((messages) => {
        return [...messages, JSON.parse(event.data)];
      });
    };

    setWebSocket(ws);

    return () => {
      ws.close();
    };
  }, [spec, user]);

  const handleSend = useCallback(() => {
    if (
      webSocket &&
      webSocket.readyState === 1 &&
      message.trim().length > 0
    ) {
      webSocket.send(message.trim());
    }
  }, [webSocket, message]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div
            className={`${styles.message} ${
              message.user.login === user?.login ? styles.own : ''
            }`}
            key={index}
          >
            <div className={styles.user}>
              {message.user.shortName}
            </div>
            <div className={styles.content}>{message.content}</div>
            <div className={styles.date}>
              {getLocalDate(message.date)}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.sendWrapper}>
        <TextInput
          className={styles.input}
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
        <Icon
          className={styles.button}
          onClick={handleSend}
          color="var(--primary)"
        >
          <Send />
        </Icon>
      </div>
    </div>
  );
};

export default memo(Chat);
