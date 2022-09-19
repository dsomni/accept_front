import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function AddStudent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper({
    req: req,
    res: res,
    url: 'api/students',
    method: 'POST',
  });
}
