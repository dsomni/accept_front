import { IUserDisplay } from '@custom-types/data/IUser';
import { sendRequest } from '@requests/request';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './chatPage.module.css';
import { link } from '@constants/Avatar';
import { Avatar } from '@mantine/core';
import Chat from '@ui/Chat/Chat';
import { IChatMessage } from '@custom-types/data/IMessage';
import { Indicator } from '@ui/basics';
import { useUser } from '@hooks/useUser';
import { io } from 'socket.io-client';

const ChatPage: FC<{ entity: string }> = ({ entity }) => {
  const { user } = useUser();

  const [hosts, setHosts] = useState<[IUserDisplay, number][]>([]);
  const [newHost, setNewHost] = useState<string | undefined>(
    undefined
  );
  const [currentHost, setCurrentHost] = useState<string | undefined>(
    undefined
  );

  const fetchHosts = useCallback((hosts: string[]) => {
    // fetch users display by logins
    return new Promise<IUserDisplay[]>((resolve) => {
      sendRequest<{}, IUserDisplay[]>(
        `/user/display`,
        'POST',
        hosts
      ).then((res) => {
        if (!res.error) {
          resolve(res.response);
        }
      });
    });
  }, []);

  const socket = useMemo(
    () =>
      typeof window !== 'undefined' && user?.login
        ? io(`${process.env.WEBSOCKET_API}`, {
            path: '/ws/host',
            transports: ['polling'],
          })
        : undefined,
    [user?.login]
  );

  useEffect(() => {
    if (!newHost) return;
    if (newHost === currentHost) return;
    const index = hosts.findIndex((item) => item[0].login == newHost);
    if (index >= 0) {
      setHosts((old_hosts) => {
        old_hosts[index][1] += 1;
        return [...old_hosts];
      });
      setNewHost(undefined);
    } else {
      fetchHosts([newHost]).then((res) => {
        setHosts((old_hosts) => {
          old_hosts.push([res[0], 1]);
          return [...old_hosts];
        });
      });
      setNewHost(undefined);
    }
  }, [hosts, newHost, currentHost, fetchHosts]);

  useEffect(() => {
    if (!socket) return;
    socket.connect();
    socket.on('connect', () =>
      socket.emit('register', entity, user?.login)
    );
    socket.on('disconnect', () => {
      // socket.connect();
    });
    socket.on('new_message_from', (response) => {
      const host = JSON.parse(response) as string;
      setNewHost(host);
    });
    socket.on('register_response', (response) => {
      const hosts = JSON.parse(response) as string[];
      fetchHosts(hosts).then((res) =>
        setHosts(
          res.map((item) => [item, 0] as [IUserDisplay, number])
        )
      );
    });

    // Clean-up
    return () => {
      socket.removeAllListeners('connect');
      socket.removeAllListeners('disconnect');
      socket.removeAllListeners('new_host');
      socket.removeAllListeners('register_response');
    };
  }, [socket]); // eslint-disable-line

  return (
    <div className={styles.wrapper}>
      <div className={styles.hostList}>
        {hosts.map((host, index) => (
          <div
            className={`${styles.hostWrapper} ${
              host[0].login == currentHost ? styles.currentHost : ''
            }`}
            key={index}
            onClick={() => {
              setCurrentHost(host[0].login);
              setHosts((old_hosts) => {
                const index = hosts.findIndex(
                  (item) => item[0].login == host[0].login
                );
                if (index >= 0) {
                  old_hosts[index][1] = 0;
                }
                return [...old_hosts];
              });
            }}
          >
            <Indicator
              offset={2}
              label={host[1]}
              disabled={host[1] == 0}
              scale="sm"
            >
              <Avatar
                radius="md"
                size="md"
                src={link(host[0].login)}
                alt={'Users avatar'}
              />
            </Indicator>
            <div className={styles.hostName}>{host[0].shortName}</div>
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
