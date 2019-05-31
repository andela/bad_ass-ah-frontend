import React from 'react';
import { shallow } from 'enzyme';
import { EditProfile } from '../../../../components/users/profile/EditProfile';

const props = {
  getCurrentProfile: jest.fn(),
  updateProfile: jest.fn(),
  profile: {
    image: ''
  }
};

describe('EditProfile component', () => {
  const component = shallow(<EditProfile {...props} />);
  component.setState({ fileImg: '' });

  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call onSubmit method when the button is clicked', () => {
    const spy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().forceUpdate();
    component.setState({ fileImg: 'file' });

    const fakeEvent = { preventDefault: () => {} };
    const form = component.find('#edit-profile-form');
    form.simulate('submit', fakeEvent);
    expect(form.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onChange method when the input value is changed', () => {
    const spy = jest.spyOn(component.instance(), 'onChange');
    component.instance().forceUpdate();

    const event = {
      target: { value: 'username' }
    };

    const input = component.find('Input').at(0);
    input.simulate('change', event);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleFiles method when the is uploaded', () => {
    const spy = jest.spyOn(component.instance(), 'handleFiles');
    const imageFile = component.find('ReactFileReader');
    const instance = component.instance();
    const expected = { fileList: ['image'] };
    instance.handleFiles(expected);
    expect(imageFile.length).toBe(1);
    expect(component.state('image')).toBe(expected);
    expect(spy).toBeDefined();
  });

  it('should call componentWillReceiveProps', () => {
    const profile = {
      username: 'John Doe',
      image: 'image',
      bio: 'My bio'
    };
    component.setProps({ profile });
    const { props } = component.instance();
    expect(props.profile).toBe(profile);
  });
});
