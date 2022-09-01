import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function AddAssignmentTag(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper({
    req: req,
    res: res,
    url: 'api/assignment_tag',
    method: 'POST',
  });
}
