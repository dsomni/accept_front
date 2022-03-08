export const withPrefix = (path: string) => `/api/${path}`;

export type availableMethods = 'GET' | 'PUT' | 'POST' | 'DELETE';

export const sendRequest = <ISend, IReceive>(
  path: string,
  method: availableMethods,
  body?: ISend extends object ? ISend : object
): Promise<IReceive | false> => {
  let options: any = {
    credentials: 'include',
    method,
  };
  if (body) {
    options.body = JSON.stringify(body as object);
  }
  return fetch(withPrefix(path), options)
    .then((res) => (res.status === 200 ? res.json() : false))
    .then((res) => res as IReceive)
    .catch((e) => false);
};

export const isSuccessful = <ISend>(
  path: string,
  method: availableMethods,
  body?: ISend extends object ? ISend : object
): Promise<boolean> => {
  let options: any = {
    credentials: 'include',
    method,
  };
  if (body) {
    options.body = JSON.stringify(body as object);
  }
  return fetch(withPrefix(path), options)
    .then((res) => res.status === 200)
    .catch((_) => false);
};
