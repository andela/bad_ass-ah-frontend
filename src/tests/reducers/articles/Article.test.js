import getAllArticle from '../../../reducers/article';
import {
  GET_ALL_ARTICLE, CREATE_ARTICLE, ARTICLE_FAILURE, LOADING, ADD_TAG,
  REMOVE_TAG
} from '../../../actions/type';

// @test
describe('Article reducer', () => {
  it('should return empty initial state', () => {
    const state = getAllArticle([], {});
    expect(state).toEqual([]);
  });
  it('should return state when GET_ALL_ARTICLE action', () => {
    const payload = {
      articles: {
        id: Math.random()
      },
      newArticles: {
        title: 'this is andela'
      }
    };
    const initialState = {
      allArticles: []
    };
    const state = getAllArticle(initialState, {
      type: GET_ALL_ARTICLE,
      payload
    });
    expect(state).toEqual({ allArticles: [payload] });
  });
  it('should return state when CREATE_ARTICLE actions from reducers', () => {
    const payload = {
      title: 'this is title',
      body: 'this is title',
      image: '',
      tag: 'tag'
    };
    const state = getAllArticle([], {
      type: CREATE_ARTICLE,
      payload
    });
    expect(state).toEqual({ newArticle: payload, loading: false });
  });
  it('should return authentication error when ARTICLE_ERROR action called', () => {
    const payload = {
      unauthorized: 'Unauthorized'
    };
    const state = getAllArticle([], {
      type: ARTICLE_FAILURE,
      payload
    });
    expect(state).toEqual({ error: payload });
  });
  it('should load data from state when LOADING action called', () => {
    const payload = {
      loading: false
    };
    const state = getAllArticle([], {
      type: LOADING,
      payload
    });
    expect(state).toEqual(payload);
  });
  it('should add tag when ADD_TAG action called', () => {
    const initialState = {
      newTag: ''
    };
    const payload = 'laravel';
    const data = getAllArticle(initialState, {
      type: ADD_TAG,
      payload: [...initialState.newTag, payload]
    });
    expect(data).toEqual({ newTag: [[payload]] });
  });
  it('should remove tag when REMOVE_TAG action called', () => {
    const payload = 'laravel';
    const initialState = {
      newTag: [{ tag: 'laravel' }]
    };
    const state = getAllArticle(initialState, {
      type: REMOVE_TAG,
      payload: [...initialState.newTag.filter(tag => tag !== payload)]
    });
    expect(state).toEqual({ newTag: [{ tag: payload }] });
  });
});
