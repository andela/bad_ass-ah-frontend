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
      ],
      metaData: {
        prevPage: 2,
        nextPage: 4,
        currentPage: 3,
        totalPages: 4,
        limit: 6
      }
    }]
  },
};
describe('<AllArticle />', () => {
  const component = shallow(<Index {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  it('should load pages', () => {
    const instance = component.instance();
    instance.loadPage();
    expect(instance).toBeDefined();
  });
});
