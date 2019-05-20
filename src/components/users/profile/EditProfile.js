/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactFileReader from 'react-file-reader';
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';
import Alert from '../../layouts/Alert';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { getCurrentProfile, updateProfile } from '../../../actions/profile';
import avatar from '../../../assets/Images/avatar.svg';

export class EditProfile extends Component {
  state = {
    username: '',
    bio: '',
    image: '',
    fileImg: ''
  };

  componentDidMount() {
    const { getCurrentProfile } = this.props;
    getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      const { profile } = nextProps;

      profile.username = profile.username !== null ? profile.username : '';
      profile.bio = profile.bio !== null ? profile.bio : '';
      profile.image = profile.image !== null ? profile.image : '';

      this.setState({
        username: profile.username,
        bio: profile.bio,
        image: profile.image
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFiles = (files) => {
    const data = files ? files.fileList[0] : '';
    this.setState({ image: files || '', fileImg: data });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { updateProfile, history } = this.props;
    const { username, bio, fileImg } = this.state;
    const profileData = {
      username,
      bio
    };
    if (fileImg !== '') {
      profileData.image = fileImg;
    }
    updateProfile(profileData, history);
  };

  render() {
    const {
      username, bio, image, fileImg
    } = this.state;
    const img = image === '' ? avatar : image;
    return (
      <Fragment>
        <Navbar />
        <div className="profile-container">
          <div className="edit-profile-content">
            <Alert />
            <form onSubmit={this.onSubmit} id="edit-profile-form">
              <h2 className="password-title">Edit Profile</h2>
              <div className="user-profile">
                <div className="user-info">
                  <Input
                    type="text"
                    name="username"
                    value={username}
                    className="profile-input"
                    onChange={this.onChange}
                    placeholder="Username"
                    required
                  />
                  <textarea
                    name="bio"
                    value={bio}
                    rows="7"
                    onChange={this.onChange}
                    placeholder="Type your bio..."
                    className="profile-input"
                  />
                </div>
                <div className="user-image">
                  <img src={fileImg === '' ? img : image.base64} alt="" />
                  <ReactFileReader handleFiles={this.handleFiles} base64>
                    <button type="button" className="upload-image-btn">
                      <i className="fas fa-cloud-upload-alt" />
                      Upload image
                    </button>
                  </ReactFileReader>
                </div>
              </div>
              <Button value="Change Profile" className="profile-btn" />
            </form>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

EditProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateProfile }
)(EditProfile);
