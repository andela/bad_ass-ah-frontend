import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../components/layouts/Spinner';

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Spinner />);
    expect(component).toMatchSnapshot();
  });
});
