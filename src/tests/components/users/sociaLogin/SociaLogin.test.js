import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SociaLogin } from '../../../../components/users/sociaLogin/SociaLogin';
import localStorage from '../../../../helpers/localStorage';

sinon.stub(window.location, 'replace');

const props = {
  loadUser: jest.fn(),
  isAuthenticated: false,
  location: {
    search: '?token=jhjhgjhg&username=jaman'
  }
};

describe('Home.js', () => {
  const wrapper = shallow(<SociaLogin {...props} />);

  it('should initialize the localstorage', () => expect(localStorage.store).toEqual({}));

  it('returns undefined if requested item doesn\'t exist', () => {
    const token = localStorage.getItem('token');
    expect(token).toBeUndefined();
  });

  it('should get the value of the local storage', () => {
    localStorage.setItem('token', 'eheheheheheheh');
    expect(localStorage.store).toEqual({ token: 'eheheheheheheh' });
  });

  it('Should call callFacebookSocialLogin metnod when button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'callFacebookSocialLogin');
    wrapper.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const btn = wrapper.find('.socialMedia').at(0);
    btn.simulate('click', fakeEvent);
    expect(btn.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('Should call callTwitterSocialLogin metnod when button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'callTwitterSocialLogin');
    wrapper.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const btn = wrapper.find('.socialMedia').at(1);
    btn.simulate('click', fakeEvent);
    expect(btn.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('Should call callGemailSocialLogin metnod when button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'callGemailSocialLogin');
    wrapper.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const btn = wrapper.find('.socialMedia').at(2);
    btn.simulate('click', fakeEvent);
    expect(btn.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('Should redirect the authenticated user', () => {
    props.isAuthenticated = true;
    const component = shallow(<SociaLogin {...props} />);
    expect(component).toMatchSnapshot();
  });
});
