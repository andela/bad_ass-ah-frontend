import { decodeToken } from 'jsontokens';

const token = localStorage.getItem('token');
const Config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};
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
export { Config as default, isAuthenticated };
