import { callback } from '@custom-types/ui/atomic';
import { availableMethods, sendRequest } from '@requests/request';
import { useEffect, useState, useMemo } from 'react';

export function useRequest<Body, ReqAnswer, Answer = ReqAnswer>(
  url: string,
  method?: availableMethods,
  body?: Body extends object ? Body : object,
  processData?: callback<ReqAnswer, Answer>
): [Answer | undefined, boolean, boolean, object] {
  const process = useMemo(
    () => (processData ? processData : (a: any) => a),
    [processData]
  );
  const [data, setData] = useState<Answer>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    let cleanUp = false;
    setLoading(true);
    setError(false);
    setDetail('');
    sendRequest<Body, ReqAnswer>(url, method || 'GET', body).then(
      (res) => {
        if (!cleanUp) {
          if (!res.error) {
            setData(process(res.response));
          } else {
            setError(true);
            setDetail(res.detail);
          }
          setLoading(false);
        }
      }
    );

    return () => {
      cleanUp = true;
    };
  }, [url, method, process, body]);

  return [data, loading, error, detail];
}
