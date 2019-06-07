import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ReactComponent as Star } from '../../../assets/Images/icons/star.svg';
import { ReactComponent as Spinner } from '../../../assets/Images/spinner1.svg';
import * as actions from '../../../actions';
import Button from '../../common/button/Button';

export class Rating extends Component {
  state = {
    rating: null,
    error: null,
    ratingTemp: null,
    isSupposedToRedirect: false,
    showStars: false
  }

  componentWillMount = () => {
    this.props.onLoginCheckState();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.userPreviousRating !== prevProps.userPreviousRating) {
      this.setState({
        rating: this.props.userPreviousRating,
        ratingTemp: this.props.userPreviousRating,
        showStars: false
      });
      this.props.onGetArticleAverageRating(this.props.articleId);
    }
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.showPreviousUserRating();
    }
  }

  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.showPreviousUserRating();
      this.setState({
        rating: this.props.userPreviousRating,
        ratingTemp: this.props.userPreviousRating
      });
    }
    this.props.onGetArticleAverageRating(this.props.articleId);
    this.props.onSetLoginRedirectPath('/');
  };

  showPreviousUserRating = () => {
    const { articleId } = this.props;
    this.props.onGetUserArticleRating(articleId);
  }

  rate = (rating) => {
    if (this.props.isAuthenticated) {
      this.props.onRate(this.props.articleId, rating);
      this.setState({
        rating,
        ratingTemp: rating,
        showStars: false
      });
    } else {
      this.props.onSetLoginRedirectPath(window.location.pathname);
      this.setState({ isSupposedToRedirect: true });
    }
  };

  starMouseOverHandler = (rating) => {
    this.setState({ rating });
  }

  starMouseOutHandler = () => {
    this.setState({ rating: this.state.ratingTemp });
  }

  displayRatingStar = () => {
    this.setState({ showStars: true });
  }

  render() {
    const { rating, isSupposedToRedirect, showStars } = this.state;

    const ratingStars = [];
    for (let i = 1; i <= 5; i += 1) {
      let starClass = 'star-rating__star';
      if (rating >= i && rating !== null) {
        starClass += ' star-rating__star--selected';
      }
      const star = <Star
        key={i}
        className={starClass}
        onClick={() => this.rate(i)}
        onMouseOver={() => this.starMouseOverHandler(i)}
        onMouseOut={() => this.starMouseOutHandler()} />;
      ratingStars.push(star);
    }

    const {
      userPreviousRating, isRating, averageRating, totalRatings, error
    } = this.props;

    const displayError = error !== null ? <p className={'star-rating__error'}>{error}</p> : null;

    let loadWait = null;
    if (isRating) {
      loadWait = <div className='star-rating__load-wait'>
        <Spinner className='star-rating__spinner' /> <span>Please wait...</span>
      </div>;
    }

    let loginRedirect = null;
    if (isSupposedToRedirect) {
      loginRedirect = <Redirect to='/login' />;
    }

    let displayStart = [...ratingStars];
    if (showStars === false && userPreviousRating !== null) {
      displayStart = <Button btnClass='star-rating__btn-edit' onClick={() => this.displayRatingStar()}>Edit rating</Button>;
    }

    return (
      <>
        {loginRedirect}
        < div className={'star-rating__container'} >
          <h2 className={'star-rating__title'}>Please rate this article:</h2>
          <div className={'star-rating__container-rating'}>
            <div className={'star-rating__ratings'}>
              <div className={'star-rating'}>
                {displayError}
                {loadWait}
                {displayStart}
              </div>
              <div className={'star-rating__description'}>
                <span>Your rating: {userPreviousRating !== null ? userPreviousRating : 'None'}</span>
              </div>
            </div>
            <div className={'star-rating__average-rating'}>
              <span>Average: {averageRating !== null ? averageRating : 'None'}</span>
              <span>{totalRatings !== null ? `(${totalRatings} Ratings)` : null}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userPreviousRating: state.rating.rating,
  isAuthenticated: state.login.isAuthenticated,
  error: state.rating.error,
  isRating: state.rating.isRating,
  averageRating: state.rating.averageRating,
  totalRatings: state.rating.totalRatings
});

const mapDispatchToProps = dispatch => ({
  onRate: (articleId, rating) => dispatch(actions.rate(articleId, rating)),
  onLoginCheckState: () => dispatch(actions.loginCheckState()),
  onGetUserArticleRating: articleId => dispatch(actions.getUserArticleRating(articleId)),
  onGetArticleAverageRating: articleId => dispatch(actions.getArticleAverageRating(articleId)),
  onSetLoginRedirectPath: path => dispatch(actions.setLoginRedirectPath(path))
});

Rating.propTypes = {
  error: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isRating: PropTypes.bool,
  totalRatings: PropTypes.number,
  userPreviousRating: PropTypes.number,
  averageRating: PropTypes.number,
  articleId: PropTypes.string,
  onRate: PropTypes.func,
  onLoginCheckState: PropTypes.func,
  onGetUserArticleRating: PropTypes.func,
  onGetArticleAverageRating: PropTypes.func,
  onSetLoginRedirectPath: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
