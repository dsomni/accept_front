import { useCallback, useEffect, useState } from 'react';

interface IRequestData {
  loading: boolean;
  updatesCounter: number;
}

const COUNTER_LIMIT = 1000;

export function useRefetch(
  func: () => Promise<any>,
  updateIntervalSeconds: number
): IRequestData {
  const [updatesCounter, setUpdatesCounter] = useState(0);
  const [loading, setLoading] = useState(true);

  const funcWrapper = useCallback(() => {
    setLoading(true);
    func()
      .then(() => {
        setUpdatesCounter((counter) => (counter % COUNTER_LIMIT) + 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [func]);

  useEffect(() => {
    funcWrapper();
  }, []); // eslint-disable-line

  useEffect(() => {
    const id = setInterval(funcWrapper, updateIntervalSeconds * 1000);

    return () => clearInterval(id);
  }, [updateIntervalSeconds, funcWrapper]);

  return { updatesCounter, loading };
}
