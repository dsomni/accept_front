import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function DeleteTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(
    req,
    res,
    `api/task_tag/${req.body.spec}`,
    'DELETE'
  );
}
