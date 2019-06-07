import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('Main Component', () => {
  it('renders without crashing', () => {
    let component;
    act(() => {
      component = mount(<App />);
    });
    expect(component).toMatchSnapshot();
  });
});
