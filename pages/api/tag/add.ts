import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function AddTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper({
    req: req,
    res: res,
    url: 'api/task_tag',
    method: 'POST',
  });
}
