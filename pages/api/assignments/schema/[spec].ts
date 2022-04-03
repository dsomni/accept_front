import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/assignment_schema';

export default async function AssignmentSchema(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${url}/${req.query.spec}`);
  console.log(response);
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
