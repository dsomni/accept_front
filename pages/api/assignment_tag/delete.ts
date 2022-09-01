import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function DeleteAssignmentTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(
    req,
    res,
    `api/assignment_tag/${req.body.spec}`,
    'DELETE'
  );
}
