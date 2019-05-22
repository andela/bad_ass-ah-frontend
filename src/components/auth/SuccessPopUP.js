import React, { Component } from 'react';
import success from '../../assets/Images/success.png';

// eslint-disable-next-line react/prefer-stateless-function
class SuccessPopUp extends Component {
  state={
    display: 'block'
  }

  onClose = () => {
    this.setState({ display: 'none' });
    setTimeout(() => {
      window.location.href = '/register';
    }, 100);
  }

  render() {
    const { display } = this.state;
    return (
      <div className="C-popUp" style={{ display }}>
        <button onClick={this.onClose} type="button" className="C-closePopUp">x</button>
        <div className="C-popup-success">
          <div className="C-popupDescription">
            <center>
              {' '}
              <img src={success} alt="" />
            </center>
            <div className="C-popup-message">
              <h1>Welcome to Authors Haven</h1>
                  One more step! Check your email.
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SuccessPopUp;
