import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import { serialize } from 'cookie';

const url = env.API_ENDPOINT + '/api/refresh';

export default async function refresh(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: req.headers as { [key: string]: string },
    });
    if (response.status === 200) {
      const data = await response.json();
      res.setHeader('Set-Cookie', [
        serialize('access_token_cookie', data['new_access_token'], {
          secure: process.env.NODE_ENV !== 'development',
          maxAge: data['new_access_token_max_age'],
          sameSite: 'strict',
          path: '/',
        }),
      ]);
      return res.status(200).json(data);
    }
    return res.status(401).send('Error');
  } catch {
    res.status(401).json('Error');
  }
}
