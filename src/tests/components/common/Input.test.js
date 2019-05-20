import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../components/common/Input';

const props = {
  type: 'text',
  name: 'email',
  id: 'email',
  placeholder: 'E-mail Address',
  className: 'input',
  value: 'johndoe@example.com',
  onChange: jest.fn()
};

describe('Input Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Input {...props} />);
    expect(component).toMatchSnapshot();
  });
});
