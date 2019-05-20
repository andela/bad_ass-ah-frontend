/* eslint-disable no-console */
import React from 'react';
import { shallow } from 'enzyme';
import { ResetPassword } from '../../../../components/users/forgotPassword/ResetPassword';

const props = {
  setAlert: jest.fn(),
  resetPassword: jest.fn(),
  isChanged: false,
  match: {
    params: {
      token: ''
    }
  }
};

describe('ResetPassword Component', () => {
  const component = shallow(<ResetPassword {...props} />);

  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call onSubmit method when the button is clicked', () => {
    const spy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const form = component.find('#reset-password-form');
    form.simulate('submit', fakeEvent);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onChange method when the input value is changed', () => {
    const spy = jest.spyOn(component.instance(), 'onChange');
    component.instance().forceUpdate();

    const event = {
      target: { value: 'password' }
    };

    const input = component.find('Input').at(0);
    input.simulate('change', event);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should redirect to login', () => {
    props.isChanged = true;
    const component2 = shallow(<ResetPassword {...props} />);
    expect(component2).toMatchSnapshot();
  });
});
