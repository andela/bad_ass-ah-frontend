import React from 'react';
import { shallow } from 'enzyme';

import { Spinner } from '../../../../components/common/spinner/Spinner';

describe('<Spinner />', () => {
  const component = shallow(<Spinner />);
  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
