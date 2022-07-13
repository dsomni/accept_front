import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/task';

export default async function DeleteTask(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const spec = req.body.spec;
  const response = await fetch(`${url}/${spec}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: req.headers as { [key: string]: string },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
