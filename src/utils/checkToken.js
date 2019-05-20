import setAuthToken from './setAuthToken';

export const checkToken = () => {
  if (localStorage.token) {
    setAuthToken(`Bearer ${localStorage.token}`);
  }
};
