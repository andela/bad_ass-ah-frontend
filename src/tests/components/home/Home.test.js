import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../components/home/Home';

const props = {
  auth: {
    user: {
      username: 'Emabush'
    }
  }
};
describe('Home.js', () => {
  it('should render', () => {
    const wrapper = shallow(<Home {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
