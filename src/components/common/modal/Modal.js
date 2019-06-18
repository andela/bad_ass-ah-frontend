import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../backdrop/Backdrop';

class Modal extends Component {
  render() {
    return (
      <>
        <Backdrop show={this.props.show} onClick={this.props.onClick} />
        <div className='modal' style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? '1' : '0'
        }}>
          {this.props.children}
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string
};

export default Modal;
