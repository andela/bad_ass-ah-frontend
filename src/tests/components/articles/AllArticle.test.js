import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../../components/Index';

const props = {
  getAllArticle: jest.fn(),
  allArticle: {
    allArticles: [{
      articles: [
        {
          title: 'this is title',
          body: 'body',
          taglist: ['this is tag'],
          image: 'this is image',
          authorfkey: {
            image: 'avatar',
            username: 'username'
          }
        }
      ]
    }]
  }
};
describe('<AllArticle />', () => {
  const component = shallow(<Index {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
