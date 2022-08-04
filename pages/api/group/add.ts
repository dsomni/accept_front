import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = env.API_ENDPOINT + '/api/group';

const url2 = env.API_ENDPOINT + '/api/group-users';

export default async function AddGroup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const create = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(body.group),
    headers: { 'content-type': 'application/json' },
  });
  const status = create.status;
  const data = await create.json();
  if (status == 200 && data.spec) {
    const response = await fetch(`${url2}/${data.spec}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body.members),
      headers: { 'content-type': 'application/json' },
    });
    const status = response.status;
    const resp = await response.json();
    res.status(status).json(resp);
  } else {
    res.status(status).json(data);
  }
}
