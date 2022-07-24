import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/bundle/task-page';

export default async function Task(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers;
  const response = await fetch(`${url}/${req.query.spec}`, {
    credentials: 'include',
    headers: headers as { [key: string]: string },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
