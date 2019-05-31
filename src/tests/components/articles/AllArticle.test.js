import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../components/Index';

const props = {
  getAllArticle: jest.fn(),
  allArticle: jest.fn()
};
describe('<AllArticle />', () => {
  const component = shallow(<Index {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
