import getAllArticle from '../../../reducers/article';
import { GET_ALL_ARTICLE } from '../../../actions/type';

// @test
describe('Article reducer', () => {
  test('should return empty initial state', () => {
    const state = getAllArticle([], {});
    expect(state).toEqual([]);
  });
  test('should return state when GET_ALL_ARTICLE action', () => {
    const payload = {
      articles: {
        id: Math.random()
      },
      newArticles: {
        title: 'this is andela'
      }
    };
    const state = getAllArticle([], {
      type: GET_ALL_ARTICLE,
      payload
    });
    expect(state).toEqual({ articles: payload });
  });
});
