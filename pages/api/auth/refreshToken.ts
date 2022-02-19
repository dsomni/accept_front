import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

const url = 'http://' + env.API_ENDPOINT + '/api/login';

export default async function refresh(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { headers, body } = req;
  try {
    const { data, headers: returnedHeaders } = await fetch(url, {
      method: 'POST',
      headers: headers as { [key: string]: string },
    }).then((res) => res.json());
    // console.log(data, headers);
    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    );
    res.status(200).json(data);
  } catch {
    res.status(401).json('Error');
  }
}
