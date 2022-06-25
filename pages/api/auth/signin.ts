import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import { serialize } from 'cookie';

const url = 'http://' + env.API_ENDPOINT + '/api/login';

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const headers = req.headers;
    headers['content-type'] = 'application/json';
    const response = await fetch(url, {
      method: 'POST',
      headers: headers as { [key: string]: string },
      body: JSON.stringify(req.body),
      credentials: 'include',
    });
    if (response.status === 200) {
      const data = await response.json();
      res.setHeader('Set-Cookie', [
        serialize('access_token_cookie', data['access_token'], {
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 30 * 60,
          sameSite: 'strict',
          path: '/',
        }),
        serialize('refresh_token_cookie', data['refresh_token'], {
          secure: process.env.NODE_ENV !== 'development',
          maxAge: (30 * 24 - 6) * 60 * 60,
          sameSite: 'strict',
          path: '/',
        }),
      ]);
      return res.status(200).send('Success');
    }
    return res.status(401).send('error');
  } catch (e) {
    if (e instanceof TypeError) return res.status(400).send('Error');
    res.status(400).send('Error');
  }
}
