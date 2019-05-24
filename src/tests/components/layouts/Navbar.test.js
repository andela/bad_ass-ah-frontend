import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../../components/layouts/Navbar';

describe('Navbar Component', () => {
  const component = shallow(<Navbar />);
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });
  it('should test open toggle', () => {
    component.setState(prevState => ({
      open: !prevState.open
    }));
    jest.spyOn(component.instance(), 'OnOpen');
    const open = component.find('[data-test="openToggle"]');
    open.simulate('click', () => {});
    expect(open.length).toBe(1);
  });
  it('should test logout method', () => {
    const instance = component.instance();
    instance.logout();
    expect(instance).toBeDefined();
  });
});
