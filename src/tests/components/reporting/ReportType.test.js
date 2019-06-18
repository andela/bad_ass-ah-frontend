import React from 'react';
import { shallow } from 'enzyme';
import { ReportType, mapStateToProps, mapDispatchToProps } from '../../../components/articles/reporting/ReportType';
import Input from '../../../components/common/input/Input';

describe('<ReportType />', () => {
  let wrapper;
  const props = {
    setTypeSuccessMessage: null,
    onSetReportType: jest.fn(),
    isSetting: true,
    errorSettingType: 'error'
  };

  beforeEach(() => {
    wrapper = shallow(<ReportType {...props} />);
  });

  it('should render <ReportType /> component', () => {
    wrapper.setState({
      hideReportTypeError: false,
      valueReportTypeForm: 'type'
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call submitReportTypeHandler if the form submitted', () => {
    const spy = jest.spyOn(wrapper.instance(), 'submitReportTypeHandler');
    wrapper.instance().forceUpdate();
    wrapper.setState({ hideReportTypeError: false });
    wrapper.setProps({ setTypeSuccessMessage: 'success' });
    const fakeEvent = { preventDefault: () => { } };
    const form = wrapper.find('.report__type-form');
    form.simulate('submit', fakeEvent);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call inputChangedHandler if the input changed', () => {
    const spy = jest.spyOn(wrapper.instance(), 'inputChangedHandler');
    wrapper.instance().forceUpdate();
    const event = {
      target: { value: 'type' }
    };
    const input = wrapper.find(Input).at(0);
    input.simulate('change', event);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    const initialState = {
      reportArticle: {
        errorSettingType: 'error'
      }
    };
    expect(mapStateToProps(initialState)).toMatchSnapshot();
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSetReportType('type');
    expect(dispatch.mock.calls).toMatchSnapshot();
  });
});
