import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/tournament';

export default async function EditTournament(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${url}/${req.query.spec}`, {
    method: 'PUT',
    credentials: 'include',
    body: req.body,
    headers: { 'content-type': 'application/json' },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
