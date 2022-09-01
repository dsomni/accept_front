import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function ListUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(req, res, 'api/bundle/user-list');
}
