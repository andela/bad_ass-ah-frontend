import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as Menu } from '../../../assets/Images/icons/menu.svg';
import * as actions from '../../../actions';
import ReportType from './ReportType';
import ReportArticle from './ReportArticle';
import Modal from '../../common/modal/Modal';

export class Report extends Component {
  state = {
    showDropdown: false,
    showReportForm: false,
    showCreateTypeForm: false,
    showBackDrop: false,
    isSupposedToRedirect: false,
    navigateToReportedArticles: false
  }

  closeModel = () => {
    this.setState({
      showBackDrop: false,
      showReportForm: false,
      showCreateTypeForm: false,
      menuClicked: false
    });
  }

  componentWillMount = () => {
    this.props.onLoginCheckState();
  }

  componentDidMount = () => {
    this.setState({ navigateToReportedArticles: false });
  }

  redirectUser = () => {
    this.props.onSetLoginRedirectPath(window.location.pathname);
    this.setState({ isSupposedToRedirect: true });
  }

  showDropdownContent = () => {
    if (!this.state.menuClicked && this.state.showDropdown) {
      this.setState({ showDropdown: true, menuClicked: true });
    } else {
      this.setState({ showDropdown: false, menuClicked: false });
    }
  }

  hideDropdownOnMouseOutHandler = () => {
    if (!this.state.menuClicked) {
      this.setState({ showDropdown: false });
    }
  }

  ShowDropdownOnMouseOverHandler = () => {
    if (!this.state.menuClicked) {
      this.setState({ showDropdown: true });
    }
  }

  showReportForm = () => {
    this.showDropdownContent();
    if (this.props.isAuthenticated) {
      this.setState({
        showBackDrop: true,
        showReportForm: true,
        showCreateTypeForm: false
      });
    } else {
      this.redirectUser();
    }
  }

  showCreateTypeForm = () => {
    this.showDropdownContent();
    if (this.props.isAuthenticated) {
      this.setState({
        showBackDrop: true,
        showCreateTypeForm: true,
        showReportForm: false
      });
    } else {
      this.redirectUser();
    }
  }

  showReportedArticles = () => {
    this.showDropdownContent();
    if (this.props.isAuthenticated) {
      this.setState({
        navigateToReportedArticles: true
      });
    } else {
      this.redirectUser();
    }
  }

  render() {
    const {
      showDropdown,
      showReportForm,
      showCreateTypeForm,
      isSupposedToRedirect,
      navigateToReportedArticles
    } = this.state;

    let dropDownContent = null;
    if (showDropdown) {
      dropDownContent = <ul className='dropdown__content'>
        <li
          className='dropdown__item'
          onClick={this.showReportForm}>
          Report&nbsp;story
        </li>
        {
          this.props.isAdmin === 'true'
            ? <>
              <li
                className='dropdown__item'
                id='create-type'
                onClick={this.showCreateTypeForm}>
                Create&nbsp;type
                </li>
              <li
                className='dropdown__item'
                id='create-type'
                onClick={this.showReportedArticles}>
                Reported&nbsp;stories
              </li>
            </>
            : null
        }
      </ul>;
    }

    let redirectToLogin = null;
    if (isSupposedToRedirect) {
      redirectToLogin = <Redirect to='/login' />;
    }

    let redirectToReportedArticles = null;
    if (navigateToReportedArticles) {
      redirectToReportedArticles = <Redirect to='/reported/stories' />;
    }

    return (
      <>
        {redirectToReportedArticles}
        {redirectToLogin}
        <div className='dropdown' onMouseOver={this.ShowDropdownOnMouseOverHandler} onMouseOut={this.hideDropdownOnMouseOutHandler}>
          <Menu className='dropdown__icon' onClick={this.showDropdownContent} />
          {dropDownContent}
        </div>
        <Modal show={this.state.showBackDrop} onClick={this.closeModel}>
          {showReportForm ? <ReportArticle articleId={this.props.articleId} /> : null}
          {showCreateTypeForm ? <ReportType /> : null}
        </Modal>
      </>
    );
  }
}

export const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  isAdmin: state.login.isAdmin
});

export const mapDispatchToProps = dispatch => ({
  onLoginCheckState: () => dispatch(actions.loginCheckState()),
  onSetLoginRedirectPath: path => dispatch(actions.setLoginRedirectPath(path))
});

Report.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.string,
  articleId: PropTypes.string,
  onLoginCheckState: PropTypes.func,
  onSetLoginRedirectPath: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
