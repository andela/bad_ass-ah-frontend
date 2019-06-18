import React from 'react';
import { shallow } from 'enzyme';
import { Report, mapStateToProps, mapDispatchToProps } from '../../../components/articles/reporting/Report';
import Modal from '../../../components/common/modal/Modal';

describe('<Report />', () => {
  let wrapper;
  const props = {
    onLoginCheckState: jest.fn(),
    onSetLoginRedirectPath: jest.fn(),
    isAuthenticated: true,
    isAdmin: '',
    articleId: 'articleId'
  };

  beforeEach(() => {
    wrapper = shallow(<Report {...props} />);
  });

  it('should render <Report /> component', () => {
    wrapper.setState({
      showDropdown: true
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call showDropdownContent method when dropdown icon clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showDropdownContent');
    wrapper.instance().forceUpdate();
    wrapper.setState({
      menuClicked: false,
      showDropdown: true
    });
    const icon = wrapper.find('.dropdown__icon');
    icon.simulate('click');
    expect(icon.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call showDropdownContent method when dropdown icon clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showDropdownContent');
    wrapper.instance().forceUpdate();
    wrapper.setState({
      menuClicked: true,
      showDropdown: true
    });
    const icon = wrapper.find('.dropdown__icon');
    icon.simulate('click');
    expect(icon.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call hideDropdownOnMouseOutHandler method when mouse out of dropdown', () => {
    const spy = jest.spyOn(wrapper.instance(), 'hideDropdownOnMouseOutHandler');
    wrapper.instance().forceUpdate();
    wrapper.setState({
      menuClicked: false,
      showDropdown: true
    });
    const dropdown = wrapper.find('.dropdown');
    dropdown.simulate('mouseout');
    expect(dropdown.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call ShowDropdownOnMouseOverHandler method when mouse over the dropdown', () => {
    const spy = jest.spyOn(wrapper.instance(), 'ShowDropdownOnMouseOverHandler');
    wrapper.instance().forceUpdate();
    wrapper.setState({
      menuClicked: false,
      showDropdown: true
    });
    const dropdown = wrapper.find('.dropdown');
    dropdown.simulate('mouseover');
    expect(dropdown.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call showReportForm when report-story dropdown item clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showReportForm');
    wrapper.instance().forceUpdate();
    wrapper.setState({
      showBackDrop: true,
      showReportForm: true,
      showCreateTypeForm: false,
      showDropdown: true
    });
    const item = wrapper.find('.dropdown__item').at(0);
    item.simulate('click');
    expect(item.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call showReportForm and redirect user if not auntenticated', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showReportForm');
    wrapper.instance().forceUpdate();
    wrapper.setProps({ isAuthenticated: false });
    wrapper.setState({
      showDropdown: true,
      isSupposedToRedirect: true
    });
    const item = wrapper.find('.dropdown__item').at(0);
    item.simulate('click');
    expect(item.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call showCreateTypeForm when report-story dropdown item clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showCreateTypeForm');
    wrapper.instance().forceUpdate();
    wrapper.setProps({ isAuthenticated: true, isAdmin: 'true' });
    wrapper.setState({
      showBackDrop: true,
      showCreateTypeForm: true,
      showReportForm: false,
      showDropdown: true
    });
    const item = wrapper.find('.dropdown__item').at(1);
    item.simulate('click');
    expect(item.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call showCreateTypeForm and redirect user if not auntenticated', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showCreateTypeForm');
    wrapper.instance().forceUpdate();
    wrapper.setProps({ isAuthenticated: false, isAdmin: 'true' });
    wrapper.setState({
      showDropdown: true,
      isSupposedToRedirect: true
    });
    const item = wrapper.find('.dropdown__item').at(1);
    item.simulate('click');
    expect(item.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call showReportedArticles when reported-stories dropdown item clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showReportedArticles');
    wrapper.instance().forceUpdate();
    wrapper.setProps({ isAuthenticated: true, isAdmin: 'true' });
    wrapper.setState({
      showDropdown: true,
      isSupposedToRedirect: true,
      navigateToReportedArticles: true
    });
    const item = wrapper.find('.dropdown__item').at(2);
    item.simulate('click');
    expect(item.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call showReportedArticles and redirect user if not auntenticated', () => {
    const spy = jest.spyOn(wrapper.instance(), 'showReportedArticles');
    wrapper.instance().forceUpdate();
    wrapper.setProps({ isAuthenticated: false, isAdmin: 'true' });
    wrapper.setState({
      showDropdown: true,
      isSupposedToRedirect: true
    });
    const item = wrapper.find('.dropdown__item').at(2);
    item.simulate('click');
    expect(item.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call closeModel method if clicked on the backdrop', () => {
    const spy = jest.spyOn(wrapper.instance(), 'closeModel');
    wrapper.instance().forceUpdate();
    wrapper.setState({
      showBackDrop: false,
      showReportForm: false,
      showCreateTypeForm: false,
      menuClicked: false,
    });
    const modal = wrapper.find(Modal).at(0);
    modal.simulate('click');
    expect(modal.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    const initialState = {
      login: {
        isAuthenticated: true
      }
    };
    expect(mapStateToProps(initialState)).toMatchSnapshot();
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onLoginCheckState();
    mapDispatchToProps(dispatch).onSetLoginRedirectPath('path');
    expect(dispatch.mock.calls).toMatchSnapshot();
  });
});
