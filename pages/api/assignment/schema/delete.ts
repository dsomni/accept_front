import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/assignment_schema';

export default async function DeleteAssignmentSchema(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const spec = JSON.parse(req.body).spec;
  const response = await fetch(`${url}/${spec}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}