import { Button } from '@ui/basics';
import { getApiUrl } from '@utils/getServerUrl';
import { FC, memo, useEffect, useState } from 'react';
import styles from './chat.module.css';

const Chat: FC<{ spec: string }> = ({ spec }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [send, setSend] = useState<(_: string) => void>(() => {});
  useEffect(() => {
    const ws = new WebSocket(
      `ws://${process.env.API_ENDPOINT?.split('://')[1]}/chat`,
      'protocolOne'
    );
    if (ws.readyState == 1) {
      setSend(ws.send);
      ws.onmessage = (event) =>
        setMessages((messages) => {
          messages.push(event.data);
          return messages;
        });
    }
    return () => {
      ws.close();
      setSend(() => {});
    };
  }, []);

  useEffect(() => console.log(send), [send]);

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => {
          if (send) send('text');
        }}
      >
        Send Text
      </Button>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default memo(Chat);
