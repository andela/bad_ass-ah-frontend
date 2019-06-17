import getAllArticle from '../../../reducers/article';
import {
  GET_ALL_ARTICLE, CREATE_ARTICLE, ARTICLE_FAILURE, LOADING, ADD_TAG,
  REMOVE_TAG, VOTE_ARTICLES, DELETE_ARTICLE,
  UPDATE_ARTICLE, GET_SINGLE_ARTICLE,
  BOOKMARK_ARTICLE_SUCCESS
} from '../../../actions/types';

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
  it('should like an article when VOTE_ARTICLE is called', () => {
    const initialState = {
      allArticles: [],
      newArticle: null,
      loading: true,
      error: {},
      newTag: [],
      article: null,
      likes: null,
      dislikes: null
    };
    const payload = {
      likes: 1,
      dislikes: 0
    };
    const state = getAllArticle(initialState, {
      type: VOTE_ARTICLES,
      payload
    });
    expect(state.voteMessage).toEqual(payload.message);
  });
  it('should get single article', () => {
    const payload = { title: 'laravel' };
    const initialState = { article: { article: { title: 'laravel' } } };
    const state = getAllArticle(initialState, {
      type: GET_SINGLE_ARTICLE,
      payload
    });
    expect(state).toEqual({ article: payload });
  });
  it('should update article using UPDAT_ARTICLE action', () => {
    const payload = { title: 'laravel' };
    const initialState = { updatedArticle: { title: 'laravel' } };
    const state = getAllArticle(initialState, {
      type: UPDATE_ARTICLE,
      payload
    });
    expect(state).toEqual({ updatedArticle: payload });
  });
  it('should delete article', () => {
    const payload = 'deleted successfully';
    const initialState = { message: payload };
    const state = getAllArticle(initialState, {
      type: DELETE_ARTICLE,
      payload
    });
    expect(state).toEqual({ message: payload });
  });
  it('should like an article when BOOKMARK_ARTICLE_SUCCESS is called', () => {
    const initialState = {
      allArticles: [],
      newArticle: null,
      loading: true,
      error: {},
      newTag: [],
      article: null,
      likes: null,
      dislikes: null,
      hasBookmarked: null
    };
    const payload = {
      likes: 1,
      dislikes: 0
    };
    const state = getAllArticle(initialState, {
      type: BOOKMARK_ARTICLE_SUCCESS,
      payload
    });
    expect(state.bookmarkMessage).toEqual(payload.bookmark);
  });
});
