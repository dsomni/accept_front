import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/assignment_schema';

export default async function EditAssignmentSchema(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(1);
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(req.body),
    headers: req.headers as { [key: string]: string },
  });
  const status = response.status;
  const data = await response.json();
  res.status(status).json(data);
}
