import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/assignment_tag';

export default async function AddAssignmentTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'content-type': 'application/json' },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
