import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const needRevalidation = (spec: string) =>
  `http://${env.API_ENDPOINT}/api/task-need-revalidation/${spec}`;
const url = `http://${env.API_ENDPOINT}/api/task-render`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let revalidate = false;
  const spec = JSON.parse(req.body)['spec'];
  const response = await fetch(needRevalidation(spec));
  if (response.status === 200 && (await response.json())) {
    try {
      await fetch(`${url}/${spec}`);
      await res.unstable_revalidate(`/task/${spec}`);
      revalidate = true;
    } catch (e) {
      console.log(e);
    }
  }
  res.json({
    revalidate,
  });
};

export default handler;
