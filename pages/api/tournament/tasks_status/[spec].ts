import { fetchWrapper } from '@utils/fetchWrapper';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function TournamentTasksWithStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await fetchWrapper({
    req: req,
    res: res,
    url: `api/tournament/tasks-with-status/${req.query.spec}`,
    method: req.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
  });
}
