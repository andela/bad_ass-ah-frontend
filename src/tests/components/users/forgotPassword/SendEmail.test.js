/* eslint-disable no-console */
import React from 'react';
import { shallow } from 'enzyme';
import { SendEmail } from '../../../../components/users/forgotPassword/SendEmail';

const props = {
  sendEmail: jest.fn()
};

describe('SendEmail Component', () => {
  const component = shallow(<SendEmail {...props} />);

  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call onSubmit method when the button is clicked', () => {
    const spy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const form = component.find('#send-email-form');
    form.simulate('submit', fakeEvent);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onChange method when the input value is changed', () => {
    const spy = jest.spyOn(component.instance(), 'onChange');
    component.instance().forceUpdate();

    const event = {
      target: { value: 'johndoe@example.com' }
    };

    const input = component.find('Input');
    input.simulate('change', event);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
});
