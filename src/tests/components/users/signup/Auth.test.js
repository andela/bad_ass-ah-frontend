import React from 'react';
import { shallow } from 'enzyme';
import Auth from '../../../../components/auth/Auth';


describe('<Auth />', () => {
  test('should render auth', () => {
    const wrapper = shallow(<Auth />);

    expect(wrapper).toMatchSnapshot();
  });

  test('should render auth', () => {
    const wrapper = shallow(<Auth />);

    const auth = 'signup';

    const { switchForm } = wrapper.instance();

    switchForm(auth);
    expect(wrapper.state().auth).toEqual(auth);
  });

  it('should render switching login and signup forms', () => {
    const wrapper = shallow(<Auth />);

    const spy = jest.spyOn(wrapper.instance(), 'switchForm');

    const signInBtn = wrapper.find('[data-test="signin-btn"]');

    signInBtn.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should render submit button', () => {
    const wrapper = shallow(<Auth />);

    const spy = jest.spyOn(wrapper.instance(), 'switchForm');

    const signUpBtn = wrapper.find('[data-test="signup-btn"]');

    signUpBtn.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
