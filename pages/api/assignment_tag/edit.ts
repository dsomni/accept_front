import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/assignment_tag';

export default async function EditAssignmentTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(req.body),
    headers: { 'content-type': 'application/json' },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
