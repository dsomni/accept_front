import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/group';

export default async function Group(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${url}/${req.query.spec}`);
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
