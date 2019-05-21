import React from 'react';
import { shallow } from 'enzyme';
import { AllArticles } from '../../../components/articles/AllArticles';

//
const props = {
  getAllArticle: jest.fn(),
  article: jest.fn()
};

describe('Create Article', () => {
  const component = shallow(<AllArticles {...props} />);
  test('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
