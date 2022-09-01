import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function TaskAddBundle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(req, res, '/api/bundle/task-add', 'DELETE');
}
