import React from 'react';
import { shallow } from 'enzyme';
import Backdrop from '../../../../components/common/backdrop/Backdrop';

describe('<Modal />', () => {
  const props = {
    show: true,
    onClick: jest.fn()
  };

  it('should render the <Modal /> component', () => {
    const component = shallow(<Backdrop {...props} />);
    expect(component).toMatchSnapshot();
  });
});
