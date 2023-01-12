import { IUserDisplay } from '@custom-types/data/IUser';
import { sendRequest } from '@requests/request';
import { FC, memo, useEffect, useState } from 'react';
import styles from './chatPage.module.css';
import { link } from '@constants/Avatar';
import { Avatar } from '@mantine/core';
import Chat from '@ui/Chat/Chat';
import { IChatMessage } from '@custom-types/data/IMessage';

const ChatPage: FC<{ entity: string }> = ({ entity }) => {
  const [hosts, setHosts] = useState<IUserDisplay[]>([]);
  const [currentHost, setCurrentHost] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    console.log(currentHost);
  }, [currentHost]);

  useEffect(() => {
    let cleanUp = false;
    sendRequest<{}, IUserDisplay[]>(
      `/chat/hosts/${entity}`,
      'GET'
    ).then((res) => {
      if (!res.error && !cleanUp) {
        setHosts(res.response);
      }
    });
    return () => {
      cleanUp = true;
    };
  }, [entity]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.hostList}>
        {hosts.map((host, index) => (
          <div
            className={`${styles.hostWrapper} ${
              host.login == currentHost ? styles.currentHost : ''
            }`}
            key={index}
            onClick={() => setCurrentHost(host.login)}
          >
            <Avatar
              radius="md"
              size="md"
              src={link(host.login)}
              alt={'Users avatar'}
            />
            <div className={styles.hostName}>{host.shortName}</div>
          </div>
        ))}
      </div>
      <div className={styles.chat}>
        {currentHost !== undefined && (
          <Chat
            key={currentHost}
            entity={entity}
            host={currentHost}
            setHasNew={() => {}}
            isMessageMine={(message: IChatMessage) => {
              return !(message.author === currentHost);
            }}
            wrapperStyles={styles.chatWrapper}
            wsURL={'/ws/chat'}
          />
        )}
      </div>
    </div>
  );
};

export default memo(ChatPage);
