import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/assignment_schema';

export default async function ListTasks(
  _: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url);
  console.log(response);
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
