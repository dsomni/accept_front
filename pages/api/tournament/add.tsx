import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/tournament';

export default async function AddTournament(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: req.body,
    headers: { 'content-type': 'application/json' },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
