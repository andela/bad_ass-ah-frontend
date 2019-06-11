import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../../components/common/modal/Modal';

describe('<Modal />', () => {
  const props = {
    show: true,
    onClick: jest.fn()
  };

  it('should render the <Modal /> component', () => {
    const component = shallow(<Modal {...props}></Modal>);
    expect(component).toMatchSnapshot();
  });
});
