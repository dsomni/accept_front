import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/notification';

export default async function NotificationList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: req.headers as { [key: string]: string },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
