import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function MyTasks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper({ req, res, url: 'api/task/my' });
}
