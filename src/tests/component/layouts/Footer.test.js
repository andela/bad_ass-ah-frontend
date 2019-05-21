import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/layouts/Footer';

describe('Footer Component', () => {
  test('renders without crashing', () => {
    const component = shallow(<Footer />);
    expect(component).toMatchSnapshot();
  });
});
