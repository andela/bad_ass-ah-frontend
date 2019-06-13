import React from 'react';
import { shallow } from 'enzyme';
import Highlight from '../../../components/popovers/Highlight';

const props = {
  onHighlight: jest.fn()
};

describe('HighlightPopover component', () => {
  const component = shallow(<Highlight {...props} />);
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
