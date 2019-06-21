import React from 'react';
import { shallow } from 'enzyme';
import { Rating } from '../../../components/articles/rating/Rating';
import { ReactComponent as Star } from '../../../assets/Images/icons/star.svg';
import Button from '../../../components/common/button/Button';

describe('<Rating />', () => {
  let wrapper;
  const props = {
    articleId: 'articleId',
    onLoginCheckState: jest.fn(),
    onGetArticleAverageRating: jest.fn(),
    onSetLoginRedirectPath: jest.fn(),
    onRate: jest.fn(),
    onGetUserArticleRating: jest.fn(),
    isAuthenticated: true,
    userPreviousRating: 1,
    isRating: true
  };

  beforeEach(() => {
    wrapper = shallow(<Rating {...props} />);
  });

  it('should render <Rating /> component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Star /> component', () => {
    wrapper.setState({ showStars: true });
    expect(wrapper.find(Star)).toHaveLength(6);
  });

  it('should call rate method when a star clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'rate');
    wrapper.instance().forceUpdate();
    wrapper.setProps({ userPreviousRating: 3 });
    wrapper.setState({ showStars: true });
    const star = wrapper.find(Star).at(0);
    star.simulate('click');
    expect(star.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call rate method when a star clicked', () => {
    wrapper.setProps({ isAuthenticated: false });
    const spy = jest.spyOn(wrapper.instance(), 'rate');
    wrapper.instance().forceUpdate();
    wrapper.setState({ showStars: true });
    const star = wrapper.find(Star).at(0);
    star.simulate('click');
    expect(star.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call starMouseOverHandler method when a mouse over on a star', () => {
    const spy = jest.spyOn(wrapper.instance(), 'starMouseOverHandler');
    wrapper.instance().forceUpdate();
    wrapper.setState({ showStars: true });
    const star = wrapper.find(Star).at(0);
    star.simulate('mouseover');
    expect(star.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call starMouseOutHandler method when a mouse over on a star', () => {
    const spy = jest.spyOn(wrapper.instance(), 'starMouseOutHandler');
    wrapper.instance().forceUpdate();
    wrapper.setState({ showStars: true });
    const star = wrapper.find(Star).at(0);
    star.simulate('mouseout');
    expect(star.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('componentDidMount', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.instance().props.onGetArticleAverageRating).toBeCalled();
  });

  it('should call displayRatingStar if button clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'displayRatingStar');
    wrapper.instance().forceUpdate();
    wrapper.setState({ showStars: false });
    const btn = wrapper.find(Button).at(0);
    btn.simulate('click');
    expect(btn.length).toBe(1);
    expect(spy).toHaveBeenCalled();
  });
});
