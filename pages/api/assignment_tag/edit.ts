import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function EditAssignmentTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(req, res, 'api/assignment_tag', 'PUT');
}
