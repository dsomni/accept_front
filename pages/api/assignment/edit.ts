import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function EditAssignmentSchema(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(req, res, `api/assignment`, 'PUT');
}
