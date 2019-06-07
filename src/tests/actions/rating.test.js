import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/rateArticle';
import * as actionTypes from '../../actions/types';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Rate Article actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch "rateSuccess" action', () => {
    const expectedState = [{
      type: actionTypes.RATE_START,
      isRating: true
    }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          rating: 5
        }
      });
    });

    return store.dispatch(actions.rate('QnXe0Rvbxr', 5)).then(() => {
      expect(store.getActions()).toEqual(expectedState);
    });
  });

  it('should dispatch "rateFail" action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          errors: {
            body: ['error']
          }
        }
      });
    });

    return store.dispatch(actions.rate()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch "getAverageRating" action', () => {
    const expectedState = [{
      type: actionTypes.GET_AVERAGE_RATING,
      averageRating: null,
      totalRatings: null
    }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          averageRating: null,
          totalRatings: null
        }
      });
    });

    return store.dispatch(actions.getArticleAverageRating('QnXe0Rvbxr')).then(() => {
      expect(store.getActions()).toEqual(expectedState);
    });
  });

  it('should dispatch "getAverageRating" action', () => {
    const expectedState = [{
      type: actionTypes.GET_AVERAGE_RATING,
      averageRating: 3,
      totalRatings: 3
    }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          averageRating: 3,
          totalRatings: 3
        }
      });
    });

    return store.dispatch(actions.getArticleAverageRating('QnXe0Rvbxr')).then(() => {
      expect(store.getActions()).toEqual(expectedState);
    }).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch "getUserRating" action', () => {
    const expectedState = [{
      type: actionTypes.GET_USER_RATING,
      rating: 5
    }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          rating: 5
        }
      });
    });

    return store.dispatch(actions.getUserArticleRating('QnXe0Rvbxr')).then(() => {
      expect(store.getActions()).toEqual(expectedState);
    }).catch(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should dispatch "getUserRating" action if it is fail too', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: ''
        }
      });
    });

    return store.dispatch(actions.getUserArticleRating('QnXe0Rvbxr')).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('should create an action if rate fails', () => {
    const error = 'error';
    const expectedState = {
      type: actionTypes.RATE_FAIL,
      error
    };
    expect(actions.rateFail(error)).toEqual(expectedState);
  });

  it('should create an action for successfully rating', () => {
    const rating = 4;
    const expectedState = {
      type: actionTypes.RATE_SUCCESS,
      rating
    };
    expect(actions.rateSuccess(rating)).toEqual(expectedState);
  });

  it('should create an action for getting average rating', () => {
    const averageRating = 5;
    const totalRatings = 6;
    const expectedState = {
      type: actionTypes.GET_AVERAGE_RATING,
      averageRating,
      totalRatings
    };
    expect(actions.getAverageRating(averageRating, totalRatings)).toEqual(expectedState);
  });

  it('should create an action for getting user rating', () => {
    const rating = 2;
    const expectedState = {
      type: actionTypes.GET_USER_RATING,
      rating
    };
    expect(actions.getUserRating(rating)).toEqual(expectedState);
  });

  it('should create an action when a user starts to rate', () => {
    const isRating = true;
    const expectedState = {
      type: actionTypes.RATE_START,
      isRating
    };
    expect(actions.rateStart()).toEqual(expectedState);
  });
});
