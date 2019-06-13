import React from 'react';
import { shallow } from 'enzyme';
import Popup from '../../../../components/users/registration/Popup';

const props = {
  registerUser: jest.fn(),
  errors: undefined
};
describe('<SuccessPopUp />', () => {
  jest.useFakeTimers();
  it('should render <SuccessPopUp />', () => {
    const wrapper = shallow(<Popup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should call rate method when a star clicked', () => {
    jest.runAllTimers();
    const wrapper = shallow(<Popup {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'onClose');
    wrapper.instance().forceUpdate();
    const star = wrapper.find('.C-closePopUp').at(0);
    star.simulate('click');
    expect(star.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
  it('should call rate method when a star clicked', () => {
    const wrapper = shallow(<Popup {...props} />);
    wrapper.setState({ isRedirected: true });
  });
});
