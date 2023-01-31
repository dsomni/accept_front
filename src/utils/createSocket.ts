import { io } from 'socket.io-client';

export const createSocket = (
  path: string,
  login: string | undefined
) => {
  return typeof window !== 'undefined' && login
    ? io(`${process.env.WEBSOCKET_API}`, {
        path: path,
        transports: ['polling'],
      })
    : undefined;
};
