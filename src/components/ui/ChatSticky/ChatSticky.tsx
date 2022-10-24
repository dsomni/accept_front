import { FC, memo } from 'react';
// import styles from './chatSticky.module.css';
// import { Affix } from '@mantine/core';
// import { Icon, Indicator } from '@ui/basics';
// import Chat from '@components/Dashboard/Chat/Chat';
// import { MessageCircle2 } from 'tabler-icons-react';
// import { useClickOutside } from '@mantine/hooks';

const ChatSticky: FC<{ spec: string }> = ({ spec }) => {
  // const [showChat, setShowChat] = useState(false);
  // const [hasNew, setHasNew] = useState(false);

  // const ref = useClickOutside(() => setShowChat(false));

  return (
    <>
      {/* <Affix ref={ref} position={{ bottom: 0, right: '200px' }}>
        <Chat spec={spec} opened={showChat} setHasNew={setHasNew} />
        <Icon
          onClick={() => {
            setShowChat((value) => !value);
            setHasNew(false);
          }}
          size={'xs'}
          className={styles.iconRoot}
          wrapperClassName={styles.iconWrapper}
        >
          <Indicator inline disabled={!hasNew} size={7} color="white">
            <MessageCircle2 color="white" />
          </Indicator>
        </Icon>
      </Affix> */}
    </>
  );
};

export default memo(ChatSticky);
