import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapStateToProps, mapDispatchToProps } from '../../../../components/users/login/Login';
import Input from '../../../../components/common/input/Input';
import Button from '../../../../components/common/button/Button';

describe('<Login />', () => {
  let wrapper;

  const props = {
    onLogin: jest.fn(),
    loginRedirectPath: '',
    isAuthenticated: true,
    isLogging: true
  };

  beforeEach(() => {
    wrapper = shallow(<Login {...props} />);
  });

  it('should render two <Input /> elements', () => {
    expect(wrapper.find(Input)).toHaveLength(2);
  });

  it('should render  <Button /> element', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('should call inputChangeHandler method when the email input value is changed', () => {
    const spy = jest.spyOn(wrapper.instance(), 'inputChangedHandler');
    wrapper.instance().forceUpdate();

    const event = {
      target: { value: 'blaise@gmail.com' }
    };

    const input = wrapper.find(Input).at(0);
    input.simulate('change', event);
    wrapper.update();
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call inputChangeHandler method when the password input value is changed', () => {
    const spy = jest.spyOn(wrapper.instance(), 'inputChangedHandler');
    wrapper.instance().forceUpdate();

    const event = {
      target: { value: 'password' }
    };

    const input = wrapper.find(Input).at(1);
    input.simulate('change', event);
    wrapper.update();
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should submit form if form submit', () => {
    const spy = jest.spyOn(wrapper.instance(), 'submitHandler');
    wrapper.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => { } };
    const form = wrapper.find('#login-form');
    form.simulate('submit', fakeEvent);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    const initialState = {
      login: {
        isAuthenticated: true
      }
    };
    expect(mapStateToProps(initialState)).toMatchSnapshot();
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onLogin('email', 'password');
    expect(dispatch.mock.calls).toMatchSnapshot();
  });
});
