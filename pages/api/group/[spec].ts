import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Group(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(req, res, `api/group/${req.query.spec}`);
}
