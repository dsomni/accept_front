import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import { serialize } from 'cookie';

const url = env.API_ENDPOINT + '/api/logout';

export default async function signOut(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: req.headers as { [key: string]: string },
    });
    Object.entries(response.headers).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    );
    res.setHeader('Set-Cookie', [
      serialize('access_token_cookie', '', {
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      }),
      serialize('refresh_token_cookie', '', {
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      }),
      serialize('hero', 'Evgenich_bug_in_Maxim', {
        sameSite: 'strict',
        maxAge: 5,
        path: '/',
      }),
    ]);
    res.status(200).send('Success');
  } catch {
    res.status(401).json('Error');
  }
}
