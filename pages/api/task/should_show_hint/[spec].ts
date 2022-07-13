import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url =
  'http://' + env.API_ENDPOINT + '/api/task/should-show-hint';

export default async function ShowHint(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${url}/${req.query.spec}`, {
    credentials: 'include',
    headers: req.headers as { [key: string]: string },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
