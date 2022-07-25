import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/task-display';

export default async function ListTasks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: req.headers as { [key: string]: string },
    body: JSON.stringify(req.body),
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
