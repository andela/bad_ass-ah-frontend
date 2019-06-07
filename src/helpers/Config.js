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
  try {
    const user = await decodeToken(token);
    return user;
  } catch (error) {
    const returError = {
      payload: {
        id: null
      }
    };
    return returError;
  }
};
export {
  Config as default,
  PassDispatch,
  isAuthenticated
};
