// import { IUserDisplay } from '@custom-types/data/IUser';
// import { sendRequest } from '@requests/request';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import styles from './chatPage.module.css';
import { link } from '@constants/Avatar';
import { Avatar } from '@mantine/core';
import Chat from '@ui/Chat/Chat';
import { IChatMessage } from '@custom-types/data/IMessage';
import { Indicator, LoadingOverlay } from '@ui/basics';
import InitiateChatModal from './InitiateChatModal/InitiateChatModal';
import { useLocale } from '@hooks/useLocale';
import { IHostData, useChatHosts } from '@hooks/useChatHosts';
// import { useRefetch } from '@hooks/useRefetch';
// import { getRandomIntInRange } from '@utils/random';

const ChatPage: FC<{
  entity: string;
  type: 'tournament' | 'assignment';
}> = ({ entity, type }) => {
  const { locale } = useLocale();
  const [currentHost, setCurrentHost] = useState<string | undefined>(
    undefined
  );

  const {
    hosts,
    updatesCounter,
    refetch: fetchInitialHosts,
    selectHost,
  } = useChatHosts();

  const hostLogins = useMemo(
    () => hosts.map((item) => item.user.login),
    [hosts]
  );

  const handleHostSelection = useCallback(
    (host: IHostData) => {
      return () => {
        setCurrentHost(host.user.login);
        selectHost(host.user.login);
      };
    },
    [selectHost]
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
                      host.user.login == currentHost
                        ? styles.currentHost
                        : ''
                    }`}
                    key={index}
                    onClick={handleHostSelection(host)}
                  >
                    <Indicator
                      offset={2}
                      label={host.amount}
                      disabled={host.amount == 0}
                      scale="sm"
                    >
                      <Avatar
                        radius="md"
                        size="md"
                        src={link(host.user.login)}
                        alt={'Users avatar'}
                      />
                    </Indicator>
                    <div className={styles.hostName}>
                      {host.user.shortName}
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
