import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function EditGroup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const editResponse = await fetchWrapper({
    req: req,
    res: res,
    url: 'api/group',
    method: 'PUT',
    customBody: req.body.group,
    notWriteToRes: true,
  });

  if (editResponse.status == 200) {
    await fetchWrapper({
      req: req,
      res: res,
      url: `api/group-users/${req.body.group.spec}`,
      method: 'POST',
      customBody: req.body.members,
    });
  }
}
