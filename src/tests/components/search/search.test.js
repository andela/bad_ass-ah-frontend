import React from 'react';
import { shallow } from 'enzyme';
import Search from '../../../components/search/Search';

const props = {
  item: {
    user: [
      {
        username: 'gram',
        image: 'image'
      },
    ],
    article: [
      {
        title: 'gram',
        body: 'take care',
        image: 'image',
        authorfkey: {
          image: 'image'
        }
      }
    ]
  }
};
describe('Single Search', () => {
  const component = shallow(<Search {...props}/>);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
