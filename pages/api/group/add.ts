import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function AddGroup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const createResponse = await fetchWrapper(
    req,
    res,
    'api/group',
    'POST',
    req.body.group,
    true
  );

  const status = createResponse.status;
  const data = await createResponse.json();

  if (status == 200 && data.spec) {
    await fetchWrapper(
      req,
      res,
      `api/group-users/${data.spec}`,
      'POST',
      req.body.members
    );
  }
}
