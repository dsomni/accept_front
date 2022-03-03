import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/tag';

export default async function ListTasks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { spec, title } = JSON.parse(req.body);
  const response = await fetch(`${url}/${spec}?title=${title}`, {
    method: 'PUT',
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
