import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function EditTask(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(req, res, 'api/task', 'PUT');
}
