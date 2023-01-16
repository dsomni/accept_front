import { serialize } from 'cookie';

export const createTokenCookie = (
  name: string,
  value: string,
  maxAge?: any
) =>
  serialize(name, value, {
    maxAge: maxAge || 0,
    secure: process.env.NODE_ENV !== 'development',
    path: '/',
    sameSite: 'strict',
  });
