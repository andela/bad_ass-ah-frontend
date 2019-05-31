/* eslint-disable jsx-a11y/label-has-for */

import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import ReactFileReader from 'react-file-reader';
import { createArticle, addTag, removeTag } from '../../actions/article';
import Layout from '../layouts/Layout';
import Loading from '../layouts/Loading';
import ArticleValidation from '../../helpers/Article';

export class CreateArticle extends Component {
 state = {
   title: '',
   image: '',
   tag: '',
   link: '',
   loading: false,
   open: false,
   titleError: '',
   bodyError: '',
   display: false,
   fileImg: ''
 };

BodyContent = React.createRef();

  onChange= (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit=(e) => {
    e.preventDefault();
    this.setState({ loading: true, display: false });
    const { title, fileImg } = this.state;
    const { create } = this.props;
    const data = {
      title,
      body: this.BodyContent.current ? this.BodyContent.current.innerHTML : '',
      image: fileImg,
      tag: create.newTag
    };
    const validation = ArticleValidation(data);
    if (!validation) {
      const { createArticle } = this.props;
      createArticle(data);
    } else {
      this.setState({
        titleError: validation.title,
        bodyError: validation.body,
        loading: false,
        display: true
      });
    }
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

addTag=(e) => {
  e.preventDefault();
  const { addTag } = this.props;
  const { tag } = this.state;
  const add = `#${tag}`;
  addTag(add);
  this.setState({ tag: '' });
}

handleFiles=(files) => {
  const data = files ? files.fileList[0] : '';
  this.setState({ image: files || '', fileImg: data });
}

destroyTag=(tag) => {
  const { removeTag } = this.props;
  removeTag(tag);
}

addLink= (link) => {
  document.execCommand('CreateLink', false, link);
}

render() {
  let successMessage;
  const {
    title, image, loading, tag, open, link, titleError, bodyError, display
  } = this.state;
  const { create } = this.props;
  if (Object.keys(create).length !== 0 && create.newArticle !== null) {
    if (create.newArticle !== undefined) successMessage = create.newArticle.message;
    else successMessage = '';
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  }
  return (
    <Layout>
      <Loading loading={loading} message={successMessage} />
      <div className="G-showcase">
        <div className="G-create-article" data-test="G-create-article">
          <div className="G-containers">
            <div className="G-actionType">
              {open && (
              <div className="G-links">
                <input type="text" name="link" placeholder="place your link here" onChange={this.onChange} value={link} />
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
              <div className="G-tags">
                <input type="text" name="tag" placeholder="Add tag" onChange={this.onChange} value={tag} />
                <button type="button" className="G-tagBtn" data-test="Add-tag" onClick={this.addTag}>Add</button>
              </div>
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
                <ReactFileReader handleFiles={this.handleFiles} base64 data-test="G-image">
                  <button type="button" className="setImage">
                    <i className="icofont-ui-image uploadImageIcon" />
                  </button>
                </ReactFileReader>
              </div>
              <div className="G-action">
                <button type="button" data-test="G-openTag" onClick={this.openTag}>
                  <i className="icofont-link" />
                  <small>link</small>
                </button>
              </div>
            </div>
            <div className="G-form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="titleLabel">Your title</label>
              <input
                type="text"
                name="title"
                id=""
                className="G-input"
                placeholder="write your title"
                value={title}
                onChange={this.onChange}
                data-test="G-input"
              />
            </div>
            {create.newTag !== undefined && create.newTag.length !== 0 && (
            <div className="G-form-group">
              {create.newTag.map(tag => (
                <div className="G-displayTag" key={Math.random()}>
                  <div className="G-tagName">{tag}</div>
                  <div
                    className="G-removeTag"
                    data-test="G-destroyTag"
                    role="button"
                  >
                    <button type="button" onClick={this.destroyTag.bind(this, tag)} className="trashBtn">
                      <i className="icofont-trash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )}
            <div className="G-form-group">
              {image && (
              <div className="G-image-display">
                <img src={image.base64} alt="selected " />
                {' '}
              </div>
              )}
            </div>
            <div className="G-form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Your content</label>
              <div
                id="texteditor"
                name="body"
                ref={this.BodyContent}
                contentEditable="true"
              />

            </div>
            <div className="G-form-group">
              <div className="G-publish">
                <button type="button" onClick={this.onSubmit} data-test="G-submitData">
                  <i className="icofont-world worldIcon" />
                  {' '}
                Publish
                </button>
              </div>
            </div>
          </div>
          {display === true && (
          <div className="G-displayValidation">
            <div className="G-displayError" style={{ transform: 'translatex(0%)!important' }}>
              {titleError && (
              <div className="G-errors">
                <i className="icofont-lens" />
                {' '}
                {titleError}
              </div>
              )}
              {bodyError && (
              <div className="G-errors">
                <i className="icofont-lens" />
                {' '}
                {bodyError}
              </div>
              )}
            </div>
          </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
}
CreateArticle.propTypes = {
  createArticle: PropType.func.isRequired,
  addTag: PropType.func.isRequired,
  removeTag: PropType.func.isRequired,
  create: PropType.objectOf(PropType.object).isRequired
};
const mapStateToProps = state => ({
  create: state.articles
});
export default connect(mapStateToProps, { createArticle, addTag, removeTag })(CreateArticle);
