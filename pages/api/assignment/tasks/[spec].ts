import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function TaskToDisplay(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper(
    req,
    res,
    `api/assignment-tasks/${req.query.spec}`
  );
}
