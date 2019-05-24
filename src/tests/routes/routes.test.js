import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../../routes/routes';

describe('routes.js', () => {
  it('should render', () => {
    const wrapper = shallow(<Routes />);

    expect(wrapper).toMatchSnapshot();
  });
});
