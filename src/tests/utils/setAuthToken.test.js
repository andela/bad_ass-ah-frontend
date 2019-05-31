import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

describe('setAuthToken function', () => {
  it('should delte the token from axios headers', () => {
    setAuthToken();
    expect(axios.defaults.headers.common.Authorization).toBe(undefined);
  });
});
