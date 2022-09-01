import { getApiUrl } from '@utils/getServerUrl';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

interface FetchWrapperProps {
  req: NextApiRequest;
  res: NextApiResponse;
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  customBody?: any;
  notWriteToRes?: boolean;
}

export const fetchWrapper = async (props: FetchWrapperProps) => {
  const { req, res, url, method, customBody, notWriteToRes, ..._ } =
    props;
  const fetchMethod = method || 'GET';
  const fetch_url = `${getApiUrl()}/${url}`;
  const fetch_data = {
    method: fetchMethod,
    credentials: 'include' as RequestCredentials,
    body:
      fetchMethod == 'GET'
        ? null
        : customBody
        ? JSON.stringify(customBody)
        : JSON.stringify(req.body),
    headers: {
      'content-type': 'application/json',
      ...(req.headers as { [key: string]: string }),
    },
  };
  let response = await fetch(fetch_url, fetch_data);

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

        response = await fetch(fetch_url, fetch_data);
      }
    } catch {}
  }

  if (!!!notWriteToRes) {
    const data = await response.json();
    res.status(status).json(data);
  }
  return response;
};
