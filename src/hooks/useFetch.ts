import { useEffect } from 'react';

export const useFetch = async (
  url: string,
  setData: (e: any) => void,
  setError?: (e: any) => void
) => {
  useEffect(() => {
    let cleanUp = false;

    fetch(url).then((res) => {
      if (res.status == 200) {
        res.json().then((res) => setData(res));
        return;
      }
      if (setError) {
        res.json().then((res) => setError(res));
      }
    });

    return () => {
      cleanUp = true;
    };
  }, []);
};
