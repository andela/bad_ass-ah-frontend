import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/reportArticle';
import * as actionTypes from '../../actions/types';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Report Article actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch "reportArticle" action', () => {
    const expectedState = [{
      isReporting: true,
      type: actionTypes.REPORT_ARTICLE_START
    }, {
      message: 'message',
      type: actionTypes.REPORT_ARTICLE_SUCCESS
    }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'message'
        }
      });
    });

    return store.dispatch(actions.reportArticle('QnXe0Rvbxr', 1, 'comment'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedState);
      });
  });

  it('should dispatch "reportArticle" action if it is fail too', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: ''
        }
      });
    });

    return store.dispatch(actions.reportArticle('QnXe0Rvbxr', 1, 'comment'))
      .then(() => {
      }).catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('should dispatch "getReportTypes" action', () => {
    const expectedState = [{
      type: actionTypes.GET_REPORT_TYPES_START,
      isFetchingTypes: true
    }, {
      type: actionTypes.GET_REPORT_TYPES_SUCCESS,
      data: [{ type: 'type' }]
    }
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ type: 'type' }]
      });
    });

    return store.dispatch(actions.getReportTypes())
      .then(() => {
        expect(store.getActions()).toEqual(expectedState);
      });
  });

  it('should dispatch "getReportTypesFail" action if fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: ''
        }
      });
    });

    return store.dispatch(actions.getReportTypes('QnXe0Rvbxr', 1, 'comment'))
      .then(() => {
      }).catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('should dispatch "setReportType" action', () => {
    const expectedState = [{
      type: actionTypes.SET_REPORT_TYPE_START,
      isSetting: true
    }, {
      type: actionTypes.SET_REPORT_TYPE_SUCCESS,
      message: 'message'
    }
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'message'
        }
      });
    });

    return store.dispatch(actions.setReportType('type'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedState);
      });
  });

  it('should dispatch "setReportTypeFail" action if fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: ''
        }
      });
    });

    return store.dispatch(actions.setReportType('type'))
      .then(() => {
      }).catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('should dispatch "setReportTypeFail" action if a user is not admin', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {
          error: ''
        }
      });
    });

    return store.dispatch(actions.setReportType('type'))
      .then(() => {
      }).catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('should dispatch "getReportedArticles" action', () => {
    const expectedState = [{
      type: actionTypes.GET_REPORTED_ARTICLES_START,
      isGettingReportedArticle: true
    }, {
      type: actionTypes.GET_REPORTED_ARTICLES_SUCCESS,
      reportedArticles: [{ type: 'type' }]
    }
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ type: 'type' }]
      });
    });

    return store.dispatch(actions.getReportedArticles())
      .then(() => {
        expect(store.getActions()).toEqual(expectedState);
      });
  });

  it('should dispatch "getReportedArticles" action if a user is not admin', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: {
          error: ''
        }
      });
    });

    return store.dispatch(actions.getReportedArticles())
      .then(() => {
      }).catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('should dispatch "getReportedArticlesFail" action if it fails', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: ''
        }
      });
    });

    return store.dispatch(actions.getReportedArticles())
      .then(() => {
      }).catch(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});
