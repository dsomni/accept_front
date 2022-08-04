import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/assignment_schema';

export default async function DeleteAssignmentSchema(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const spec = req.body.spec;
  const response = await fetch(`${url}/${spec}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
