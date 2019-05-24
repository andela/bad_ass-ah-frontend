import React from 'react';
import { shallow } from 'enzyme';


import { SingleArticle } from '../../../components/articles/SingleArticle';

const props = {
  singleArticle: jest.fn(),
  match: { params: jest.fn() },
  addTag: jest.fn(),
  articles: jest.fn()
};

describe('<SingleArticle />', () => {
  const component = shallow(<SingleArticle {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
