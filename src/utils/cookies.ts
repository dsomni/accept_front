export const setCookie = (
  name: string,
  content: string,
  cookieParams?: object
) => {
  let cookie = `${name}=${content};`;
  cookieParams = { Path: '/', ...cookieParams };
  if (cookieParams) {
    for (const [key, value] of Object.entries(cookieParams)) {
      cookie += `${key}=${value};`;
    }
  }
  console.log(cookie);

  document.cookie = cookie;
  console.log(5);
  console.log(document.cookie);
};

export const getCookie = (
  name: string,
  defaultValue?: string
): string | void => {
  const res = document.cookie
    .split(';')
    .find((item) => item.trim().startsWith(`${name}=`));
  if (res) {
    return res.split('=')[1];
  }
  if (defaultValue) return defaultValue;
};
