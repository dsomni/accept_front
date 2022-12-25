import { DefaultLayout } from '@layouts/DefaultLayout';
// import { getWSUrl } from '@utils/getServerUrl';
import { ReactElement } from 'react';

// const SOCKET_API = getWSUrl();

function TestPage() {
  // const socket = useMemo(
  //   () =>
  //     io('ws://localhost:8000', {
  //       // if using only a socketio app without a mountpoint to a fastapi app,
  //       // the socketmountpoint variable should either be set to the default
  //       // mountpoint "/" or "/" should be prefixed to the socketio path (i.e. below commented out)
  //       path: `/ws/notification`,
  //       // path: `/${SOCKETIOPATH}`, // For this socketio-only scenario NOTE THE FORWARD SLASH prefix
  //       // transports: ['websocket', 'polling'],
  //       autoConnect: false, // For demo purposes as we manually connect/disconnect
  //     }),
  //   []
  // );
  // const [isConnected, setIsConnected] = useState(false); // socket.connected not always accurate; use a useState

  // useEffect(() => {
  //   socket.on('connect', () => setIsConnected(true));
  //   socket.on('disconnect', () => setIsConnected(false));
  //   socket.on('response', (response) => console.log(response));
  //   socket.on('notification', (response) =>
  //     console.log('notification', response)
  //   );

  //   // Clean-up
  //   return () => {
  //     socket.removeAllListeners('connect');
  //     socket.removeAllListeners('disconnect');
  //     socket.removeAllListeners('response');
  //   };
  // }, [socket]);

  return (
    <div className="App">
      {/* <button onClick={() => socket.connect()}>Connect</button>
      <button onClick={() => socket.disconnect()}>Disconnect</button>
      <button onClick={() => socket.emit('register', '11111')}>
        Register
      </button>
      {true && (
        <input
          placeholder="You can now send messages"
          onChange={(e) => socket.emit('message', e.target.value)}
        />
      )} */}
    </div>
  );
}

TestPage.getLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};
export default TestPage;
