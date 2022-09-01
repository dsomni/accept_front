import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function EditTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(req, res, 'api/task_tag', 'PUT');
}
