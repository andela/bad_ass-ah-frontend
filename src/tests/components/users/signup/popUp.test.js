import React from 'react';
import { shallow } from 'enzyme';
import SuccessPopUp from '../../../../components/auth/SuccessPopUP';

const props = {
  registerUser: jest.fn(),
  errors: undefined
};
describe('<SuccessPopUp />', () => {
  it('should render <SuccessPopUp />', () => {
    const wrapper = shallow(<SuccessPopUp {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
