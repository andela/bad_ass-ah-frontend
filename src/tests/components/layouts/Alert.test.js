import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from '../../../components/layouts/Alert';

const props = {
  alerts: [
    {
      id: 1,
      msg: 'Success',
      alertType: 'success'
    }
  ]
};

describe('Alert Component', () => {
  it('renders without crashing', () => {
    const component = shallow(<Alert {...props} />);
    expect(component).toMatchSnapshot();
  });
});
