import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/group';

export default async function ListGroups(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url);
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
