import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/bundle/task-list';

export default async function ListTasks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers;
  const response = await fetch(url, {
    headers: headers as { [key: string]: string },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
