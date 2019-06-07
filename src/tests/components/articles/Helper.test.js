import React from 'react';
import { shallow } from 'enzyme';
import EditorCommand from '../../../components/articles/EditorCommand';

// @spy function
const spyFunc = (component, func) => {
  const spy = jest.spyOn(component, func);
  component.forceUpdate();
  return spy;
};
describe('<Helper />', () => {
  const component = shallow(<EditorCommand />);
  it('Should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should open tag input', () => {
    const spy = spyFunc(component.instance(), 'openTag');
    const fakeEvent = { preventDefault: () => {} };
    const input = component.find('[data-test="G-openTag"]');
    input.simulate('click', fakeEvent);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onChange method when the input value is changed', () => {
    const spy = jest.spyOn(component.instance(), 'onChange');
    component.instance().forceUpdate();

    const event = {
      target: { value: 'username' }
    };

    const input = component.find('input').at(0);
    input.simulate('change', event);
    expect(input.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call setBold method when the set bold button is clicked', () => {
    const execCommand = jest.fn();
    Object.defineProperty(global.document, 'execCommand', { value: execCommand });
    const spy = jest.spyOn(component.instance(), 'setBold');
    component.instance().forceUpdate();

    const btn = component.find('button').at(1);
    btn.simulate('click');
    expect(btn.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call addLink method when the add link button is clicked', () => {
    const spy = jest.spyOn(component.instance(), 'addLink');
    component.instance().forceUpdate();

    const btn = component.find('button').at(0);
    btn.simulate('click');
    expect(btn.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
});
