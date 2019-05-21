import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import ReactFileReader from 'react-file-reader';
import { createArticle, addTag, removeTag } from '../../actions/article';
import Layout from '../layouts/Layout';
import Loading from '../layouts/Loading';

export class CreateArticle extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      image: '',
      tag: '',
      loading: false,
      open: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.addTag = this.addTag.bind(this);
    this.openTag = this.openTag.bind(this);
    this.destroyTag = this.destroyTag.bind(this);
    this.BodyContent = React.createRef();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // @set loading to true
    this.setState({ loading: true });
    const { title, fileImg } = this.state;
    const { create } = this.props;
    const data = {
      title,
      body: this.BodyContent.current ? this.BodyContent.current.innerHTML : '',
      image: fileImg,
      tag: create.newTag
    };
    const { createArticle } = this.props;
    createArticle(data);
  }

setBold=() => {
  document.execCommand('Bold', false, null);
}

openTag(e) {
  e.preventDefault();
  const { open } = this.state;
  this.setState({ open: !open });
}

addTag(e) {
  e.preventDefault();
  const { addTag } = this.props;
  const { tag } = this.state;
  addTag(tag);
  this.setState({ tag: '' });
}

handleFiles(files) {
  this.setState({ image: files || '', fileImg: files.fileList[0] });
}

destroyTag(tag) {
  const { removeTag } = this.props;
  removeTag(tag);
}

render() {
  let successMessage;
  const {
    title, image, loading, tag, open
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
          <div className="G-actionType">
            {open === true && (
            <div className="G-tags">
              <input type="text" name="tag" placeholder="Add tag" onChange={this.onChange} value={tag} />
              <button type="button" className="G-tagBtn" onClick={this.addTag}>Add</button>
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
              <ReactFileReader handleFiles={this.handleFiles} base64 data-test="G-image">
                <button type="button" className="setImage">
                  <i className="icofont-ui-image uploadImageIcon" />
                </button>
              </ReactFileReader>
            </div>
            <div className="G-action">
              <button type="button" onClick={this.openTag}>
                <i className="icofont-plus" />
                <small>Tags</small>
              </button>
            </div>
            <div className="G-publish">
              <button type="button" onClick={this.onSubmit} data-test="G-submitData">
                <i className="icofont-world worldIcon" />
                {' '}
                Publish
              </button>
            </div>
          </div>
          <div className="G-form-group">
            <input
              type="text"
              name="title"
              id=""
              className="G-input"
              placeholder="title"
              value={title}
              onChange={this.onChange}
              data-test="G-input"
            />
          </div>
          {create.newTag !== undefined && create.newTag.length !== 0 && (
          <div className="G-form-group">
            {create.newTag.map(tag => (
              <div className="G-displayTag" key={Math.random()}>
                <div>{tag}</div>
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
            <div
              id="texteditor"
              name="body"
              ref={this.BodyContent}
              contentEditable="true"
            />

          </div>
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
