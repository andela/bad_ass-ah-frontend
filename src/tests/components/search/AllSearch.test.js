import React from 'react';
import { shallow } from 'enzyme';
import { AllSearch } from '../../../components/search/AllSearch';

const props = {
  searchAll: jest.fn(),
  searchInfo: {
    search: {
      user: [{
        id: 1,
        username: 'gram',
        email: 'gram@gmail.com',
        image: 'image'
      }],
      article: [{
        title: 'this is title',
        body: 'this is body',
        image: 'image',
        taglist: ['image', 'image2']
      }]
    }
  },
  location: {
    search: {
      value: {
        search: '?search=this'
      }
    }
  }
};

describe('All Search results', () => {
  const component = shallow(<AllSearch {...props} />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  it('Should test component will receive props', () => {
    const instance = component.instance();
    const send = {
      searchInfo: {
        search: {
          user: [{
            username: 'yes',
            image: 'image'
          }],
          article: [{
            title: 'title',
            body: 'body of content',
            image: 'image',
            taglist: ['image'],
            authorfkey: {
              image: 'image',
              username: 'gram'
            }
          },
          {
            title: 'title',
            body: 'body of content',
            image: 'image',
            taglist: ['image'],
            authorfkey: {
              image: 'image',
              username: 'gram'
            }
          }]
        }
      }
    };
    instance.componentWillReceiveProps(send);
    expect(instance).toBeDefined();
  });
  it('should test onSearch', () => {
    const instance = component.instance();
    const fakeEvent = { target: { value: 'this is man' } };
    instance.onSearch(fakeEvent);
    expect(instance).toBeDefined();
  });
  it('should test onNavigate function', () => {
    const instance = component.instance();
    const fakeEvent = { preventDefault: () => {}, target: { name: 'stories' } };
    instance.onNavigate(fakeEvent);
    expect(instance).toBeDefined();
  });
  it('should test componentWillMount', () => {
    const instance = component.instance();
    instance.componentWillMount();
    expect(instance).toBeDefined();
  });
});
