import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../../components/layouts/Navbar';

describe('Navbar Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Navbar />);
    expect(component).toMatchSnapshot();
  });
});
