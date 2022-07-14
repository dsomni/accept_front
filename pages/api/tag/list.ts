import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/task_tag';

export default async function ListTags(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url);
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
