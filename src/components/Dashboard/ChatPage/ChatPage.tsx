// import { IUserDisplay } from '@custom-types/data/IUser';
// import { sendRequest } from '@requests/request';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import styles from './chatPage.module.css';
import { link } from '@constants/Avatar';
import { Avatar } from '@mantine/core';
import Chat from '@ui/Chat/Chat';
import { IChatMessage } from '@custom-types/data/IMessage';
import { Indicator, LoadingOverlay, TextInput } from '@ui/basics';
import InitiateChatModal from './InitiateChatModal/InitiateChatModal';
import { useLocale } from '@hooks/useLocale';
import Fuse from 'fuse.js';
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

  const [searchedHosts, setSearchedHosts] =
    useState<IHostData[]>(hosts);

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

  const handleSearch = useCallback(
    (search: string) => {
      if (hosts.length == 0) return;
      if (search.length == 0) return setSearchedHosts(hosts);
      const fuse = new Fuse(hosts, {
        keys: ['user.login', 'user.shortName'],
        findAllMatches: true,
      });
      const searched = fuse.search(search).map((item) => item.item);
      setSearchedHosts(searched);
    },
    [hosts]
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
            <div className={styles.hostsWrapper}>
              <TextInput
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={locale.dashboard.chat.search.placeholder}
              />
              <div className={styles.hostList}>
                {searchedHosts.length > 0 ? (
                  <div className={styles.hosts}>
                    {searchedHosts.map((host, index) => (
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
                ) : (
                  <div className={styles.nothingFound}>
                    {locale.dashboard.chat.search.nothingFound}
                  </div>
                )}
                <InitiateChatModal
                  entity={entity}
                  type={type}
                  exclude={hostLogins}
                  onSuccess={fetchInitialHosts}
                />
              </div>
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
