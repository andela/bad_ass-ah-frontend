/* eslint-disable valid-jsdoc */
/* eslint-disable jsx-a11y/label-has-for */

/**
 * creating article
 * gratien
 */
import React, { Component } from 'react';
import PropType from 'prop-types';
import ReactFileReader from 'react-file-reader';
import { connect } from 'react-redux';
import { createArticle, addTag, removeTag } from '../../actions/article';
import Layout from '../layouts/Layout';
import Loading from '../layouts/Loading';
import ArticleValidation from '../../helpers/Article';
import EditorCommand from './EditorCommand';


export class CreateArticle extends Component {
 state = {
   title: '',
   image: '',
   tag: '',
   loading: false,
   titleError: '',
   bodyError: '',
   display: false,
   fileImg: ''
 };

BodyContent = React.createRef();

Title = React.createRef();

  onChange= (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addTag=(e) => {
    e.preventDefault();
    const { addTag } = this.props;
    const { tag } = this.state;
    const add = `#${tag}`;
    addTag(add);
    this.setState({ tag: '' });
  }

   destroyTag=(tag) => {
     const { removeTag } = this.props;
     removeTag(tag);
   }

  onSubmit= async (e) => {
    e.preventDefault();
    this.setState({ loading: true, display: false });
    const { fileImg } = this.state;
    const { create } = this.props;
    const data = {
      title: this.Title.current ? this.Title.current.innerHTML : '',
      body: this.BodyContent.current ? this.BodyContent.current.innerHTML : '',
      image: fileImg,
      tag: create.newTag
    };
    const validation = await ArticleValidation(data);
    if (!validation) {
      const { createArticle } = this.props;
      await createArticle(data);
    } else {
      this.setState({
        titleError: validation.title,
        bodyError: validation.body,
        loading: false,
        display: true
      });
    }
  }

  handleFiles=(files) => {
    const data = files ? files.fileList[0] : '';
    this.setState({ image: files || '', fileImg: data });
  }

  render() {
    let successMessage;
    const {
      image, loading, titleError, bodyError, display, tag
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
          <div className="G-action">
                <ReactFileReader handleFiles={this.handleFiles} base64 data-test="G-image">
                  <button type="button" className="setImage">
                    <i className="icofont-ui-image uploadImageIcon" />
                  </button>
                </ReactFileReader>
              </div>
            <EditorCommand />
            <div className="G-tags">
                <input type="text" name="tag" placeholder="Add tag" data-test="add-tag"
                onChange={this.onChange} value={tag} />
                <button type="button" className="G-tagBtn" data-test="Add-tag" onClick={this.addTag}>Add</button>
              </div>
            </div>
            <div className="G-form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="titleLabel changeTitle">Your title</label>
              <div contentEditable="true" ref={this.Title} data-test="G-input"
              name="title"
              className="G-titleEditor"/>
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
  create: PropType.objectOf(PropType.object).isRequired,
  addTag: PropType.func.isRequired,
  removeTag: PropType.func.isRequired
};
const mapStateToProps = state => ({
  create: state.articles
});
export default connect(mapStateToProps, { createArticle, addTag, removeTag })(CreateArticle);
