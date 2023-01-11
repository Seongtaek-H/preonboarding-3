const maxLength = 50;

export const getCacheData = async (key: string) => {
  const res = JSON.parse(localStorage.getItem(key)!);
  if (localStorage.length > maxLength) {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(res));
    return res;
  } else {
    localStorage.setItem(key, JSON.stringify(res));
    return res;
  }
};

export const setCasheData = (key: string, data: []) => {
  if (localStorage.length >= maxLength) {
    localStorage.removeItem(localStorage.key(0) as string);
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
