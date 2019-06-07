import { isAuthenticated } from '../../helpers/Config';

describe('isAuthenticated', () => {
  it('Should test is authenticated', () => {
    expect(isAuthenticated()).toBeDefined();
  });
});
