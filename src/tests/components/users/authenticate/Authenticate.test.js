import React from 'react';
import { shallow } from 'enzyme';
import { Authenticate } from '../../../../components/users/authenticate/Authenticate';
import localStorage from '../../../../helpers/localStorage';
import Button from '../../../../components/common/button/Button';

const props = {
  loadUser: jest.fn(),
  isAuthenticated: false,
  location: {
    search: '?token=jhjhgjhg&username=jaman'
  }
};

describe('Home.js', () => {
  const wrapper = shallow(<Authenticate {...props} />);

  it('should initialize the localstorage', () => expect(localStorage.store).toEqual({}));

  it('returns undefined if requested item doesn\'t exist', () => {
    const token = localStorage.getItem('token');
    expect(token).toBeUndefined();
  });

  it('should get the value of the local storage', () => {
    localStorage.setItem('token', 'eheheheheheheh');
    expect(localStorage.store).toEqual({ token: 'eheheheheheheh' });
  });

  it('Should redirect the authenticated user', () => {
    props.isAuthenticated = true;
    expect(wrapper).toMatchSnapshot();
  });

  it('Should redirect the authenticated user', () => {
    props.isAuthenticated = true;
    props.token = 'token';
    const component = shallow(<Authenticate {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call switchForm method when the button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'switchForm');
    wrapper.instance().forceUpdate();
    const button = wrapper.find(Button).at(0);
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call switchForm method when the button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'switchForm');
    wrapper.instance().forceUpdate();
    const button = wrapper.find(Button).at(1);
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
});
