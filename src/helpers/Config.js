import { decodeToken } from 'jsontokens';

const token = localStorage.getItem('token');
const Config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }
};
const PassDispatch = (type, payload) => ({
  type,
  payload
});

const isAuthenticated = async () => {
  const user = await decodeToken(token);
  return user;
};
export {
  Config as default,
  PassDispatch,
  isAuthenticated
};
