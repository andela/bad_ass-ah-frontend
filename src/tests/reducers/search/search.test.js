import { SEARCH_ITEM } from '../../../actions/types';
import search from '../../../reducers/search';

describe('Search reducer', () => {
  it('should return default state', () => {
    const newState = search({}, {});
    expect(newState).toEqual({});
  });
  it('should test SEARCH_ITEM case', () => {
    const payload = {
      article: [{
        title: 'laravel',
        body: 'laravel',
        taglist: ['ty'],
        image: 'image',
        authorfkey: {
          username: 'username',
          email: 'gram@gmail.com'
        }
      }],
      user: [{
        id: 12,
        username: 'username',
        email: 'gram'
      }]
    };
    const newState = search({ search: null }, {
      type: SEARCH_ITEM,
      payload
    });
    expect(newState).toBeDefined();
  });
});
