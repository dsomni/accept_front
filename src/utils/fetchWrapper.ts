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

const refresh_url = `${getApiUrl()}/api/refresh`;

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
    } as { [key: string]: string },
  };
  let response = await fetch(fetch_url, fetch_data);

  if (response.status == 401 || response.status == 403) {
    try {
      const refresh_response = await fetch(refresh_url, {
        method: 'POST',
        credentials: 'include',
        headers: req.headers as { [key: string]: string },
      });

      if (refresh_response.status === 200) {
        const refresh_data = await refresh_response.json();

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

        response = await fetch(fetch_url, {
          ...fetch_data,
          headers: {
            ...fetch_data.headers,
            cookie:
              `access_token_cookie=${refresh_data['new_access_token']};` +
              fetch_data.headers.cookie,
          },
        });
      }
    } catch {}
  }

  if (!!!notWriteToRes) {
    const data = await response.json();

    res.status(response.status).json(data);
  }
  return response;
};
