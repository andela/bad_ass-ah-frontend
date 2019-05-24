import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../../components/users/login/Login';
import localStorage from '../../../../helpers/localStorage';

const props = {
  loadUser: jest.fn(),
  isAuthenticated: false,
  location: {
    search: '?token=jhjhgjhg&username=jaman'
  }
};

describe('Home.js', () => {
  const wrapper = shallow(<Login {...props} />);

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
});
