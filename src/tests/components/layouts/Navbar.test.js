import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../../../components/layouts/Navbar';

const props = {
  getNotifications: jest.fn(),
  notifications: ['good', 'bad'],
  readNotification: jest.fn(),
  loginCheckState: jest.fn(),
  isAdmin: 'true',
  isAuthenticated: true,
  getCurrentProfile: jest.fn(),
  subscribe: jest.fn(),
  searching: jest.fn(),
  searchAll: {}
};

describe('Navbar Component', () => {
  const component = shallow(<Navbar {...props}/>);
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

  it('should call onChange method when the toggle value is changed', () => {
    const spy = jest.spyOn(component.instance(), 'onChange');
    component.instance().forceUpdate();

    const event = {
      target: { value: true }
    };

    const input = component.find('input').at(1);
    input.simulate('change', event);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps', () => {
    const profile = {
      username: 'John Doe',
      image: 'image',
      bio: 'My bio',
      allowNotifications: true
    };
    component.setProps({ profile });
    const { props } = component.instance();
    expect(props.profile).toBe(profile);
  });
  it('should test logout method', () => {
    const notification = component.find('#one-not').at(0);
    notification.simulate('click');
    expect(props.readNotification).toHaveBeenCalled();
  });
  it('should test search data', () => {
    const instance = component.instance();
    const fakeEvent = { target: { value: 'tag' } };
    instance.searchData(fakeEvent);
    expect(instance).toBeDefined();
  });
  it('should test componentWillReceiveProps', () => {
    const instance = component.instance();
    const nextProps = {
      searchAll: {
        search: {
          user: [{ username: 'abana' }],
          article: [{ title: 'yes man' }]
        }
      }
    };
    instance.componentWillReceiveProps(nextProps);
    expect(instance).toBeDefined();
  });
  it('should test _close method', () => {
    const instance = component.instance();
    instance._close();
    expect(instance).toBeDefined();
  });
});
