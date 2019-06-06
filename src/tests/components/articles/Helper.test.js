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
});
