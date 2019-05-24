import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../../components/NotFound';

const props = {
  error: jest.fn()
};
describe('<NotFound />', () => {
  it('should render without crashing', () => {
    const component = shallow(<NotFound {...props} />);
    expect(component).toMatchSnapshot();
  });
});
