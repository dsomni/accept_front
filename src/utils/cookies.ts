export const setCookie = (
  name: string,
  content: string,
  expires?: string
) => {
  document.cookie = `${name}=${content}; expires=${
    expires || 'Fri, 31 Dec 9999 23:59:59 GMT'
  }`;
};

export const getCookie = (name: string): string | void => {
  const res = document.cookie
    .split(';')
    .find((item) => item.trim().startsWith(`${name}=`));
  if (res) {
    return res.split('=')[1];
  }
};
