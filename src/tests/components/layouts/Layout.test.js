import React from 'react';
import checkPropTypes from 'check-prop-types';
import { shallow } from 'enzyme';
import Layout from '../../../components/layouts/Layout';

const props = {
  children: jest.fn()
};
describe('<Layout /> render layout without crashing', () => {
  it('renders without crashing', () => {
    const component = shallow(<Layout {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders without error from prop children', () => {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    const result = checkPropTypes(Layout.propTypes, { name: 'julia' }, 'prop', Layout.name);
    expect(result)
      .toEqual('Failed prop type: The prop `children` is marked as required in `Layout`, but its value is `undefined`.');
  });
});
