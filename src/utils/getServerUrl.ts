import { env } from 'process';
export const getServerUrl = () =>
  env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:8080';
