import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function DeleteTask(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(req, res, `api/task/${req.body.spec}`, 'DELETE');
}
