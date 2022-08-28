import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/attempt/my';

export default async function Attempt(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = req.headers;
  const response = await fetch(`${url}`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: headers as { [key: string]: string },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
