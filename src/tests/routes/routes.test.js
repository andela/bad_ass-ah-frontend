import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../../routes/routes';

describe('<Route />', () => {
  it('should render without crashing on routes', () => {
    const component = shallow(<Routes />);
    expect(component).toMatchSnapshot();
  });
});
