import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function DeleteAssignmentSchema(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(
    req,
    res,
    `api/assignment_schema/${req.body.spec}`,
    'DELETE'
  );
}
