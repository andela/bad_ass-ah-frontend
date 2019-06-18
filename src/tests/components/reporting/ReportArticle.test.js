import React from 'react';
import { shallow } from 'enzyme';
import { ReportArticle, mapStateToProps, mapDispatchToProps } from '../../../components/articles/reporting/ReportArticle';

describe('<ReportArticle />', () => {
  let wrapper;
  const props = {
    reportSuccessMessage: null,
    articleId: 'articleId',
    onGetReportTypes: jest.fn(),
    onReportArticle: jest.fn(),
    isReporting: true,
    errorReporting: 'error',
    errorGettingTypes: null,
    reportTypes: ['type']
  };

  beforeEach(() => {
    wrapper = shallow(<ReportArticle {...props} />);
  });

  it('should render <ReportArticle /> component', () => {
    wrapper.setState({
      hideReportStoryError: false,
      valueSelectedType: 'type',
      valueReportTypeComment: 'comment'
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call submitReportedStoryHandler if the form submitted', () => {
    const spy = jest.spyOn(wrapper.instance(), 'submitReportedStoryHandler');
    wrapper.instance().forceUpdate();
    wrapper.setState({ hideReportStoryError: false });
    wrapper.setProps({ reportSuccessMessage: 'success' });
    const fakeEvent = { preventDefault: () => { } };
    const form = wrapper.find('.report__type-form');
    form.simulate('submit', fakeEvent);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call reportTypeComment if textarea changed', () => {
    const spy = jest.spyOn(wrapper.instance(), 'reportTypeComment');
    wrapper.instance().forceUpdate();
    const event = {
      target: { value: 'comment' }
    };
    const textarea = wrapper.find('.report__type-textarea');
    textarea.simulate('change', event);
    expect(textarea.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call selectedTypeHandler if select changed', () => {
    const spy = jest.spyOn(wrapper.instance(), 'selectedTypeHandler');
    wrapper.instance().forceUpdate();
    // wrapper.setState({ hideReportStoryError: false });
    const event = {
      target: { value: 'type' }
    };
    const select = wrapper.find('.report__type-selector');
    select.simulate('change', event);
    expect(select.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    const initialState = {
      reportArticle: {
        errorGettingTypes: 'error'
      }
    };
    expect(mapStateToProps(initialState)).toMatchSnapshot();
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onGetReportTypes();
    mapDispatchToProps(dispatch).onReportArticle('articleId', 'type', 'comment');
    expect(dispatch.mock.calls).toMatchSnapshot();
  });
});
