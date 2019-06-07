import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '../../../../components/users/registration/Registration';

const props = {
  registerUser: jest.fn(),
  errors: undefined,
  loading: false
};
describe('<Signup />', () => {
  it('should render <Signup />', () => {
    const wrapper = shallow(<Signup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Signup />', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<Signup {...props} />);
    const { handleSubmit } = wrapper.instance();
    handleSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should render <Signup />', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: '123456',
        name: 'password',
      }
    };
    const newProps = { ...props, errors: 'user not found ' };
    const wrapper = shallow(<Signup {...newProps} />);
    const { handleInput } = wrapper.instance();
    handleInput(event);
    expect(wrapper.state().password).toEqual(event.target.value);
  });
});
