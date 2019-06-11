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
export {
  Config as default,
  PassDispatch
};
