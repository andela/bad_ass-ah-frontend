import React from 'react';
import { shallow } from 'enzyme';
import { ActivateUser } from '../../../../components/users/registration/ActivateUser';

const props = {
  match: { params: { token: 'helloWorld' } },
  registerUser: jest.fn(),
  errors: undefined,
  activateUser: jest.fn()
};
describe('<ActivateUser />', () => {
  it('should render <ActivateUser />', () => {
    const wrapper = shallow(<ActivateUser {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('should call rate method when a star clicked', () => {
    const wrapper = shallow(<ActivateUser {...props} />);
    wrapper.instance().componentDidMount();
  });
});
