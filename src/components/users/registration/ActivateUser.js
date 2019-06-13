/* eslint-disable class-methods-use-this */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { activateUser } from '../../../actions/activateUser';

export class ActivateUser extends Component {
  state = {

  };

  componentDidMount = () => {
    const { match: { params } } = this.props;
    this.props.activateUser(params.token);
  }

  render() {
    let changeMessage = <h2>Loading ... </h2>;
    if (this.props.isActivated) {
      changeMessage = <div>
        <h2>All is set now please</h2>
        <a href="/auth">login</a>
      </div>;
    }
    return (
      <Fragment>
        <div>
          <div className="activate">{changeMessage}</div>
        </div>
      </Fragment>
    );
  }
}

ActivateUser.propTypes = {
  activateUser: PropTypes.func.isRequired,
  params: PropTypes.objectOf(PropTypes.object).isRequired,
  match: PropTypes.func.isRequired,
  isActivated: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isActivated: state.activate.isActivated
});

export default connect(
  mapStateToProps,
  { activateUser }
)(ActivateUser);
