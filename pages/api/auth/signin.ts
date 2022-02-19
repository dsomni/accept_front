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
      body: req.body,
    });
    if (response.status === 200) {
      Object.entries(response.headers).forEach((keyArr) =>
        res.setHeader(keyArr[0], keyArr[1] as string)
      );
      const data = await response.json();
      res.setHeader('Set-Cookie', [
        serialize('access_token_cookie', data[0], {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          path: '/',
        }),
        serialize('refresh_token_cookie', data[1], {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          path: '/',
        }),
      ]);
      return res.status(200).send('Success');
    }
    return res.status(401).send('error');
  } catch (e) {
    if (e instanceof TypeError) res.status(401).send('Error');
    console.log(e);
  }
}
