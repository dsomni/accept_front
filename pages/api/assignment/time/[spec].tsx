import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function ChangeTime(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper({
    req: req,
    res: res,
    url: `api/assignment/change-time/${req.query.spec}`,
    method: 'POST',
  });
}
