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
import { Indicator, LoadingOverlay } from '@ui/basics';
import { useUser } from '@hooks/useUser';
import InitiateChatModal from './InitiateChatModal/InitiateChatModal';
import { useLocale } from '@hooks/useLocale';
import { createSocket } from '@utils/createSocket';

const ChatPage: FC<{
  entity: string;
  type: 'tournament' | 'assignment';
}> = ({ entity, type }) => {
  const { user } = useUser();
  const { locale } = useLocale();
  const [hosts, setHosts] = useState<[IUserDisplay, number][]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const [newHost, setNewHost] = useState<string | undefined>(
    undefined
  );
  const [currentHost, setCurrentHost] = useState<string | undefined>(
    undefined
  );

  const hostLogins = useMemo(
    () => hosts.map((item) => item[0].login),
    [hosts]
  );

  const fetchHosts = useCallback(
    (hosts: string[]) => {
      // fetch users display by logins
      return new Promise<{ user: IUserDisplay; amount: number }[]>(
        (resolve) => {
          sendRequest<{}, { user: IUserDisplay; amount: number }[]>(
            `/hosts`,
            'POST',
            { logins: hosts, entity }
          ).then((res) => {
            if (!res.error) {
              resolve(res.response);
            }
          });
        }
      );
    },
    [entity]
  );

  const socket = useMemo(
    () => createSocket('/ws/host', user?.login),
    [user?.login]
  );

  const fetchNewHost = useCallback(
    (newHost: string) => {
      fetchHosts([newHost]).then((res) => {
        setHosts((old_hosts) => {
          old_hosts.push([res[0].user, res[0].amount]);
          return [...old_hosts.sort((a, b) => b[1] - a[1])];
        });
      });
    },
    [fetchHosts]
  );

  useEffect(() => {
    if (!newHost) return;
    if (newHost === currentHost) {
      setNewHost(undefined);
      return;
    }
    const index = hosts.findIndex((item) => item[0].login == newHost);
    if (index >= 0) {
      setHosts((old_hosts) => {
        old_hosts[index][1] += 1;
        return [...old_hosts.sort((a, b) => b[1] - a[1])];
      });
      setNewHost(undefined);
    } else {
      fetchNewHost(newHost);
      setNewHost(undefined);
    }
  }, [hosts, newHost, currentHost, fetchNewHost]);

  useEffect(() => {
    if (!socket) return;
    socket.connect();
    socket.on('connect', () => {
      socket.emit('register', entity, user?.login);
    });
    socket.on('new_message_from', (response) => {
      const host = JSON.parse(response) as string;
      setNewHost(host);
    });
    socket.on('register_response', (response) => {
      const hosts = JSON.parse(response) as string[];
      setInitialLoad(true);
      fetchHosts(hosts).then((res) => {
        setHosts(
          res
            .map(
              (item) =>
                [item.user, item.amount] as [IUserDisplay, number]
            )
            .sort((a, b) => b[1] - a[1])
        );
        setInitialLoad(false);
      });
    });

    // Clean-up
    return () => {
      socket.removeAllListeners('connect');
      socket.removeAllListeners('new_host');
      socket.removeAllListeners('register_response');
    };
  }, [socket]); // eslint-disable-line

  return (
    <div className={styles.wrapper}>
      <LoadingOverlay visible={initialLoad} />
      {initialLoad ? (
        <></>
      ) : (
        <>
          {hosts.length == 0 ? (
            <div className={styles.emptyMessageWrapper}>
              <div className={styles.emptyMessage}>
                <div>{locale.dashboard.chat.emptyMessage}</div>
                <InitiateChatModal
                  entity={entity}
                  type={type}
                  exclude={hostLogins}
                  onSuccess={fetchNewHost}
                  small
                />
              </div>
            </div>
          ) : (
            <div className={styles.hostList}>
              <div className={styles.hosts}>
                {hosts.map((host, index) => (
                  <div
                    className={`${styles.hostWrapper} ${
                      host[0].login == currentHost
                        ? styles.currentHost
                        : ''
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
                    <div className={styles.hostName}>
                      {host[0].shortName}
                    </div>
                  </div>
                ))}
              </div>
              <InitiateChatModal
                entity={entity}
                type={type}
                exclude={hostLogins}
                onSuccess={fetchNewHost}
              />
            </div>
          )}
          {currentHost !== undefined && window && (
            <div className={styles.chat}>
              <Chat
                key={currentHost}
                entity={entity}
                host={currentHost}
                opened={true}
                isMessageMine={(message: IChatMessage) => {
                  return !(message.author === currentHost);
                }}
                wrapperStyles={styles.chatWrapper}
                wsURL={'/ws/chat'}
                moderator={true}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default memo(ChatPage);
