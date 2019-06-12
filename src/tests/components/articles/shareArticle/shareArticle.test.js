import React from 'react';
import { shallow } from 'enzyme';

import { ShareArticle } from '../../../../components/articles/shareArticle/shareArticle';

describe('<ShareArticle />', () => {
  const component = shallow(<ShareArticle />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
