import { env } from 'process';
export const getServerUrl = () => env.SERVER_URL;
export const getApiUrl = () => env.API_ENDPOINT;
