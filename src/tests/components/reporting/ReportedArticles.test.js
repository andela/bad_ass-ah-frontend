import React from 'react';
import { shallow } from 'enzyme';
import { ReportedArticles, mapStateToProps, mapDispatchToProps } from '../../../components/articles/reporting/ReportedArticles';

describe('<ReportedArticles />', () => {
  let wrapper;
  const props = {
    onGetReportedArticles: jest.fn(),
    isGettingReportedArticle: true,
    reportedArticles: [{
      articleId: 123,
      comment: 'comment',
      reportType: {
        type: 'type'
      },
      article: {
        title: 'title'
      }
    },
    {
      articleId: 123,
      comment: 'comment',
      reportType: {
        type: 'type'
      },
      article: {
        title: 'title'
      }
    }],
    errorGettingReportedArticles: 'error',
  };

  beforeEach(() => {
    wrapper = shallow(<ReportedArticles {...props} />);
  });

  it('should render <ReportedArticles /> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should display error if it found', () => {
    wrapper.setProps({ isGettingReportedArticle: false, errorGettingReportedArticles: null });
    const error = wrapper.find('.report__reported-wrapper--title').at(0);
    expect(error.length).toEqual(1);
  });

  it('should map state to props', () => {
    const initialState = {
      reportArticle: {
        isGettingReportedArticle: true
      }
    };
    expect(mapStateToProps(initialState)).toMatchSnapshot();
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onGetReportedArticles();
    expect(dispatch.mock.calls).toMatchSnapshot();
  });
});
