import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../../../components/layouts/Loading';

describe('<Loading /> component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Loading />);
    expect(component).toMatchSnapshot();
  });
});
