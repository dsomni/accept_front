import { IUserDisplay } from '@custom-types/data/IUser';
import { sendRequest } from '@requests/request';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import styles from './chatPage.module.css';
import { link } from '@constants/Avatar';
import { Avatar } from '@mantine/core';
import Chat from '@ui/Chat/Chat';
import { IChatMessage } from '@custom-types/data/IMessage';
import { Indicator, LoadingOverlay } from '@ui/basics';
import InitiateChatModal from './InitiateChatModal/InitiateChatModal';
import { useLocale } from '@hooks/useLocale';
import { useRefetch } from '@hooks/useRefetch';
import { getRandomIntInRange } from '@utils/random';

const ChatPage: FC<{
  entity: string;
  type: 'tournament' | 'assignment';
}> = ({ entity, type }) => {
  const { locale } = useLocale();
  const [hosts, setHosts] = useState<[IUserDisplay, number][]>([]);
  const [currentHost, setCurrentHost] = useState<string | undefined>(
    undefined
  );
  const refetchIntervalSeconds = getRandomIntInRange(23, 27);

  const hostLogins = useMemo(
    () => hosts.map((item) => item[0].login),
    [hosts]
  );

  const fetchInitialHosts = useCallback(() => {
    return sendRequest<
      undefined,
      { user: IUserDisplay; amount: number }[]
    >(`/hosts/all/${entity}`, 'GET').then((res) => {
      if (!res.error)
        setHosts(
          res.response
            .map(
              (item) =>
                [item.user, item.amount] as [IUserDisplay, number]
            )
            .sort((a, b) => b[1] - a[1])
        );
    });
  }, [entity]);

  const { updatesCounter } = useRefetch(
    fetchInitialHosts,
    refetchIntervalSeconds
  );

  const initialLoad = updatesCounter == 0;

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
                  onSuccess={fetchInitialHosts}
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
                onSuccess={fetchInitialHosts}
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
