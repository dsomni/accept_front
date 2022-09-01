import { getApiUrl } from '@utils/getServerUrl';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export const fetchWrapper = async (
  req: NextApiRequest,
  res: NextApiResponse,
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
) => {
  const response = await fetch(`${getApiUrl()}/${url}`, {
    method: method || 'GET',
    credentials: 'include',
    body: JSON.stringify(req.body),
    headers: req.headers as { [key: string]: string },
  });

  const status = response.status;

  if (status == 401) {
    try {
      const refresh_response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      });
      if (refresh_response.status === 200) {
        const refresh_data = await response.json();
        res.setHeader('Set-Cookie', [
          serialize(
            'access_token_cookie',
            refresh_data['new_access_token'],
            {
              secure: process.env.NODE_ENV !== 'development',
              maxAge: refresh_data['new_access_token_max_age'],
              sameSite: 'strict',
              path: '/',
            }
          ),
        ]);

        const repeated_response = await fetch(
          `${getApiUrl()}/${url}`,
          {
            method: method || 'GET',
            credentials: 'include',
            body: JSON.stringify(req.body),
            headers: req.headers as { [key: string]: string },
          }
        );

        const data = await repeated_response.json();
        res.status(status).json(data);
      }
    } catch {}
  }

  const data = await response.json();
  res.status(status).json(data);
};
