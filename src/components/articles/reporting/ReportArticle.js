import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../common/button/Button';
import * as actions from '../../../actions';
import { ReactComponent as Spinner } from '../../../assets/Images/spinner-white.svg';

export class ReportArticle extends Component {
  state = {
    valueSelectedType: '',
    valueReportTypeComment: '',
    hideReportStoryError: true,
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.reportSuccessMessage !== prevProps.reportSuccessMessage) {
      this.resetForm();
    }
  }

  componentDidMount = () => {
    this.props.onGetReportTypes();
  }

  selectedTypeHandler = (event) => {
    this.setState({ valueSelectedType: event.target.value, hideReportStoryError: true });
  }

  reportTypeComment = (event) => {
    this.setState({ valueReportTypeComment: event.target.value, hideReportStoryError: true });
  }

  submitReportedStoryHandler = (e) => {
    e.preventDefault();
    this.setState({ hideReportStoryError: false });
    this.props.onReportArticle(
      this.props.articleId,
      this.state.valueSelectedType,
      this.state.valueReportTypeComment
    );
  }

  isReportFormValidated = () => {
    if (this.state.valueReportTypeComment.trim() !== '' && this.state.valueSelectedType.trim() !== '') {
      return true;
    }
    return false;
  }

  resetForm = () => {
    this.setState({
      valueSelectedType: '',
      valueReportTypeComment: '',
    });
  }

  render() {
    const {
      hideReportStoryError,
      valueSelectedType,
      valueReportTypeComment,
    } = this.state;

    const {
      reportTypes,
      reportSuccessMessage,
      isReporting,
      errorReporting
    } = this.props;

    let modelContent = 'Loading...';

    if (reportTypes !== null) {
      const options = [];
      for (let i = 0; i < reportTypes.length; i += 1) {
        options.push(
          <option
            key={reportTypes[i].id}
            value={reportTypes[i].id}>
            {reportTypes[i].type}
          </option>
        );
      }
      modelContent = <form onSubmit={this.submitReportedStoryHandler} className='report__type-form'>
        <div className={'form__group'}>
          <label className={'form__label report__type-input__label'} htmlFor='reportType'>Select report type</label>
          <select className='report__type-selector' value={valueSelectedType} onChange={this.selectedTypeHandler}>
            <option key={0} value=''>Select Type</option>
            {options}
          </select>
        </div>
        <div className={'form__group'}>
          <label className={'form__label report__type-input__label'} htmlFor='reportType'>Description</label>
          <textarea
            className='report__type-textarea'
            placeholder='Description...'
            name="text"
            cols="30"
            rows="6"
            value={valueReportTypeComment}
            onChange={event => this.reportTypeComment(event)}
          />
        </div>
        <Button
          disabled={!this.isReportFormValidated()}
          btnClass={'btn report__btn'}
        ><span>Report</span>{isReporting ? <Spinner className='report__spinner' /> : null}</Button>
      </form>;
    }

    let reportStoryResponse = null;
    if (reportSuccessMessage && !hideReportStoryError) {
      reportStoryResponse = <p className={'report__success'}>{reportSuccessMessage}</p>;
    }

    if (errorReporting && !hideReportStoryError) {
      reportStoryResponse = <p className={'report__error'}>{errorReporting}</p>;
    }

    return (
      <div className='modal__content'>
        <h2 className='modal__content-title'>Report story</h2>
        {reportStoryResponse}
        <div className='modal__main-content'>
          {modelContent}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  errorGettingTypes: state.reportArticle.errorGettingTypes,
  isFetchingTypes: state.reportArticle.isFetchingTypes,
  reportTypes: state.reportArticle.reportTypes,
  reportSuccessMessage: state.reportArticle.reportSuccessMessage,
  isReporting: state.reportArticle.isReporting,
  errorReporting: state.reportArticle.errorReporting
});

export const mapDispatchToProps = dispatch => ({
  onGetReportTypes: () => dispatch(actions.getReportTypes()),
  onReportArticle: (articleId, reportTypeId, comment) => dispatch(actions.reportArticle(
    articleId,
    reportTypeId,
    comment
  ))
});

ReportArticle.propTypes = {
  reportSuccessMessage: PropTypes.string,
  articleId: PropTypes.string,
  reportTypes: PropTypes.array,
  onGetReportTypes: PropTypes.func,
  onReportArticle: PropTypes.func,
  isReporting: PropTypes.bool,
  errorReporting: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportArticle);
