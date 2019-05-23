import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../../components/common/button/Button';

const props = {
  type: 'button',
  btnClass: 'class1 class2',
  disabled: false,
  clicked: jest.fn()
};

describe('Button Component', () => {
  it('should render a <Button /> component', () => {
    const component = shallow(<Button {...props}></Button>);
    expect(component).toMatchSnapshot();
  });
});
