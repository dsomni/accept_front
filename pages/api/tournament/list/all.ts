import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/list_tournaments';

export default async function ListTournaments(
  _: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url);
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
