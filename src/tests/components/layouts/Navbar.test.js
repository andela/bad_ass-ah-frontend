import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../../../components/layouts/Navbar';

const props = {
  getNotifications: jest.fn(),
  notifications: ['good', 'bad'],
  readNotification: jest.fn(),
  loginCheckState: jest.fn(),
  isAdmin: 'true',
  isAuthenticated: true
};

describe('Navbar Component', () => {
  const component = shallow(<Navbar {...props} />);
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should test open toggle', () => {
    component.setState(prevState => ({
      open: !prevState.open
    }));
    jest.spyOn(component.instance(), 'onProfileOpen');
    const open = component.find('[data-test="openToggle"]');
    open.simulate('click', () => { });
    expect(open.length).toBe(1);
  });

  it('should test open toggle', () => {
    component.setState(prevState => ({
      open: !prevState.open
    }));
    jest.spyOn(component.instance(), 'onNotificationsOpen');
    const open = component.find('[data-test="openNotificationToggle"]');
    open.simulate('click', () => { });
    expect(open.length).toBe(1);
  });

  it('should test logout method', () => {
    const instance = component.instance();
    instance.logout();
    expect(instance).toBeDefined();
  });

  it('should test logout method', () => {
    const notification = component.find('#one-not').at(0);
    notification.simulate('click');
    expect(props.readNotification).toHaveBeenCalled();
  });
});
