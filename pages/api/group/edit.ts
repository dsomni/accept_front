import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function EditGroup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const editResponse = await fetchWrapper(
    req,
    res,
    'api/group',
    'PUT',
    req.body.group,
    true
  );

  if (editResponse.status == 200) {
    await fetchWrapper(
      req,
      res,
      `api/group-users/${req.body.group.spec}`,
      'POST',
      req.body.members
    );
  }
}
