import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/group';

const url2 = 'http://' + env.API_ENDPOINT + '/api/group-users';

export default async function EditGroup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(req.body.group),
    headers: { 'content-type': 'application/json' },
  });
  const status = response.status;
  if (status == 200) {
    const response = await fetch(`${url2}/${req.body.group.spec}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(req.body.members),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    res.status(status).json(data);
  } else {
    const data = await response.json();
    res.status(status).json(data);
  }
}
