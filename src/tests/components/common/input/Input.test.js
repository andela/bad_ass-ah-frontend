import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../../components/common/input/Input';

const props = {
  elementType: 'input',
  inputClasses: ['class1', 'class2'],
  invalid: true,
  touched: true,
  shouldValidate: true,
  elementConfig: {
    placeholder: 'Placeholder',
    type: 'email'
  }
};

describe('Input Component', () => {
  it('should render a <Input /> component of input element', () => {
    const component = shallow(<Input {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render a <Input /> component of input element as a default', () => {
    props.elementType = 'unknownType';
    const component = shallow(<Input {...props} />);
    expect(component).toMatchSnapshot();
  });
});
