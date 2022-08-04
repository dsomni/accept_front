import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/validateLogin';

export default async function validateLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${url}/${req.query.login}`);
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
