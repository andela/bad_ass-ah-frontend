import React from 'react';
import { shallow } from 'enzyme';
import Hashid from 'hashids';
import { ViewSingleUser, mapStateToProps } from '../../../components/search/ViewSingleUser';


const hashid = new Hashid('', 10);
const props = {
  searchAll: jest.fn(),
  searchInfo: {
    search: {
      user: [{
        username: '@username',
        id: 1,
        email: 'email',
        articles: [
          {
            title: 'name',
            body: 'body',
            image: 'image',
            taglist: ['image']
          },
          {
            title: 'name',
            body: 'body',
            image: 'image',
            taglist: ['image']
          }
        ]
      }]
    }
  },
  match: {
    params: {
      handle: '@username',
      handleId: 1
    }
  }
};
describe('ViewSingleUser', () => {
  const component = shallow(<ViewSingleUser {...props}/>);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  it('should test componentWillMount', () => {
    const instance = component.instance();
    const match = {
      params: {
        handle: '@username',
        handleId: 12
      }
    };
    instance.componentWillMount();
    const { params } = match;
    if (params.handle.charAt('@') === '@') {
      instance.setState({ searchId: hashid.decode('WpmbkR5azJ') });
    }
    // if (username) username = match.params;
    expect(instance).toBeDefined();
  });
  it('should test componentWillReceiveProps', () => {
    const instance = component.instance();
    const nextProps = {
      searchInfo: {
        search: {
          user: [{
            username: '@username',
            id: 1,
            email: 'email',
            articles: [
              {
                title: 'name',
                body: 'body',
                image: 'image',
                taglist: ['image']
              },
              {
                title: 'name',
                body: 'body',
                image: 'image',
                taglist: ['image']
              }
            ]
          }]
        }
      }
    };
    instance.setState({ searchInfo: nextProps.searchInfo.search.user });
    instance.componentWillReceiveProps(nextProps);
    expect(instance).toBeDefined();
  });
  it('should call map state to props', () => {
    const state = mapStateToProps({
      searchInfo: {
        search: {
          user: [{
            username: 'username',
            email: 'email',
            id: 12,
            articles: [{
              title: 'title',
              body: 'body',
              taglist: ['tag'],
              article_id: 12
            }]
          }],
          article: [{
            title: 'title',
            body: 'body',
            taglist: ['tag'],
            article_id: 12
          }]
        }
      }
    });
    expect(state).toBeDefined();
  });
});
