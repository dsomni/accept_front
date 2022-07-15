import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/task_tag';

export default async function DeleteTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const spec = req.body.spec;
  const response = await fetch(`${url}/${spec}`, {
    method: 'DELETE',
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
