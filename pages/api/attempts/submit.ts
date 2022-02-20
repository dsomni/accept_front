import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/attempt';

export default async function ListTasks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  const response = await fetch(`${url}`, {
    method: 'POST',
    body: req.body,
    headers: req.headers as { [key: string]: string },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
