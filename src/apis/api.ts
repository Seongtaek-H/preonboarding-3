import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

export const getSick = async (inputValue: string) => {
  console.info('calling api');
  return await instance.get('/sick', { params: { q: inputValue } });
};
