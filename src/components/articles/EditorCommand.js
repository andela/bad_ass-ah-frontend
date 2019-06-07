import React, { Component, Fragment } from 'react';

class Helper extends Component {
     state={
       link: '',
       open: false,
       display: false,
     }

     onChange= (e) => {
       this.setState({ [e.target.name]: e.target.value });
     }

     setBold=() => {
       document.execCommand('Bold', false, null);
     }

     openTag=(e) => {
       e.preventDefault();
       this.setState(prevState => ({
         open: !prevState.open
       }));
     }

     addLink= (link) => {
       document.execCommand('CreateLink', false, link);
     }

     render() {
       const { open, link } = this.state;
       return (
            <Fragment>
              {open && (
              <div className="G-links">
                <input type="text" name="link" placeholder="place your link here"
                data-test="G-onChange"
                onChange={this.onChange} value={link} />
                <button
                  type="button"
                  className="G-tagBtn"
                  data-test="Add-link"
                  onClick={this.addLink.bind(this, link)}
                >
                Add
                </button>
              </div>
              )}
              <div className="G-action">
                <button
                  className="setBold"
                  type="button"
                  onClick={this.setBold}
                  data-test="G-bold"
                >
                  <i className="icofont-bold" />
                </button>
              </div>
              <div className="G-action">
                <button
                  type="button"
                  className="setItalic"
                  onClick={() => document.execCommand('Italic', false, null)}
                >
                  <i className="icofont-italic" />
                </button>
              </div>
              <div className="G-action">
                <button type="button" data-test="G-openTag" onClick={this.openTag}>
                  <i className="icofont-link" />
                  <small>link</small>
                </button>
              </div>
            </Fragment>
       );
     }
}

export default Helper;
