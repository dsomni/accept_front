import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/task-display-mode';

export default async function TaskToDisplay(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const spec = JSON.parse(req.body)['spec'];
  const response = await fetch(`${url}/${spec}`);
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
