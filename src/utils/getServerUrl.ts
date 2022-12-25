import { env } from 'process';
export const getApiUrl = () => env.API_ENDPOINT;
export const getWSUrl = () => env.WEBSOCKET_API;
