import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/attempt';

export default async function Attempt(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers;
  headers['content-type'] = 'application/json';
  const response = await fetch(`${url}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(req.body),
    headers: headers as { [key: string]: string },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
