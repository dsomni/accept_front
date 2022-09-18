import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function AddGroup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const createResponse = await fetchWrapper({
    req: req,
    res: res,
    url: 'api/group',
    method: 'POST',
    customBody: req.body.group,
    notWriteToRes: true,
  });

  const status = createResponse.status;
  const data = await createResponse.json();

  if (status == 200 && data.spec && req.body.members.length > 0) {
    await fetchWrapper({
      req: req,
      res: res,
      url: `api/group-users/${data.spec}`,
      method: 'POST',
      customBody: req.body.members,
    });
  }

  res.status(createResponse.status).json(data);
}
