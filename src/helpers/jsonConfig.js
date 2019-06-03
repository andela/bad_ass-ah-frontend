const token = localStorage.getItem('token');
const Config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};
export { Config as default };
