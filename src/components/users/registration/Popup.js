import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import success from '../../../assets/Images/success.png';
// eslint-disable-next-line react/prefer-stateless-function
class SuccessPopUp extends Component {
  state={
    display: 'block'
  }

  onClose = () => {
    setTimeout(() => {
      this.setState({
        display: 'none'
      });
    }, 100);
  }

  render() {
    const { display, isRedirected } = this.state;
    let redirect = null;
    if (isRedirected) redirect = <Redirect to= '/auth'/>;
    return (
        <>
      { redirect }
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
      </>
    );
  }
}


export default SuccessPopUp;
