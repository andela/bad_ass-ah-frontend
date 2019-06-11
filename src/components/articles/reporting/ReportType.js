import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import * as actions from '../../../actions';
import { ReactComponent as Spinner } from '../../../assets/Images/spinner-white.svg';

export class ReportType extends Component {
  state = {
    valueReportTypeForm: '',
    hideReportTypeError: true,
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.setTypeSuccessMessage !== prevProps.setTypeSuccessMessage) {
      this.resetForm();
    }
  }

  resetForm = () => {
    this.setState({
      valueReportTypeForm: ''
    });
  }

  inputChangedHandler = (event) => {
    this.setState({ valueReportTypeForm: event.target.value, hideReportTypeError: true });
  }

  submitReportTypeHandler = (e) => {
    e.preventDefault();
    this.setState({ hideReportTypeError: false });
    this.props.onSetReportType(this.state.valueReportTypeForm);
  }

  isReportTypeFormValidated = () => {
    if (this.state.valueReportTypeForm.trim() !== '') {
      return true;
    }
    return false;
  }

  render() {
    const {
      valueReportTypeForm,
      hideReportTypeError
    } = this.state;

    const {
      setTypeSuccessMessage,
      errorSettingType,
      isSetting
    } = this.props;

    let setTypeResponse = null;
    if (setTypeSuccessMessage && !hideReportTypeError) {
      setTypeResponse = <p className={'report__success'}>{setTypeSuccessMessage}</p>;
    }

    if (errorSettingType && !hideReportTypeError) {
      setTypeResponse = <p className='report__error'>{errorSettingType}</p>;
    }

    return (
      <div className='modal__content'>
        <h2 className='modal__content-title'>Create type</h2>
        {setTypeResponse}
        <div className='modal__main-content'>
          <form onSubmit={this.submitReportTypeHandler} className='report__type-form'>
            <div className={'form__group'}>
              <label className={'form__label report__type-input__label'} htmlFor='reportType'>Report Type</label>
              <Input
                inputClass={'form__input report__type-input'}
                placeholder={'Enter a report type'}
                type='text'
                value={valueReportTypeForm}
                onChange={event => this.inputChangedHandler(event)}
              />
            </div>
            <Button
              disabled={!this.isReportTypeFormValidated()}
              btnClass={'btn report__btn'}
            ><span>Create</span>{isSetting ? <Spinner className='report__spinner' /> : null}</Button>
          </form>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  errorSettingType: state.reportArticle.errorSettingType,
  setTypeSuccessMessage: state.reportArticle.setTypeSuccessMessage,
  isSetting: state.reportArticle.isSetting
});

export const mapDispatchToProps = dispatch => ({
  onSetReportType: type => dispatch(actions.setReportType(type))
});

ReportType.propTypes = {
  setTypeSuccessMessage: PropTypes.string,
  isSetting: PropTypes.bool,
  errorSettingType: PropTypes.string,
  onSetReportType: PropTypes.func,
  onSetLoginRedirectPath: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportType);
