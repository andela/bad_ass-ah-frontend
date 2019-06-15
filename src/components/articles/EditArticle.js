
import React, { Component } from 'react';
import PropType from 'prop-types';
import ReactFileReader from 'react-file-reader';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import htmlParser from 'html-react-parser';
import {
  singleArticle, updateArticle
} from '../../actions/article';
import Layout from '../layouts/Layout';
import Loading from '../layouts/Loading';
import ArticleValidation from '../../helpers/Article';
import EditorCommand from './EditorCommand';

export class EditArticle extends Component {
 state = {
   image: '',
   tag: '',
   loading: false,
   titleError: '',
   bodyError: '',
   display: false,
   fileImg: '',
   handle: ''
 };

BodyContent = React.createRef();

Title = React.createRef();

componentDidMount() {
  const { match: { params }, singleArticle } = this.props;
  const { handle } = params;
  this.setState({ handle });
  singleArticle(handle);
}

  onSubmit=(e) => {
    e.preventDefault();
    this.setState({ loading: true, display: false });
    const { fileImg, handle } = this.state;
    const { articleReducer } = this.props;
    const data = {
      title: this.Title.current ? this.Title.current.innerHTML : '',
      body: this.BodyContent.current ? this.BodyContent.current.innerHTML : '',
      image: fileImg,
      tag: articleReducer.newTag
    };
    const validation = ArticleValidation(data);
    if (!validation) {
      const { updateArticle } = this.props;
      updateArticle(handle, data);
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
    let single;
    const {
      image, loading, titleError, bodyError, display
    } = this.state;
    const { articleReducer } = this.props;
    const { message, article } = articleReducer;
    if (message !== '') {
      successMessage = 'Article updated successfully.';
    }
    if (article !== null && article !== undefined) {
      single = article.article;
    }
    return (
    <Layout>
      <Loading loading={loading} message={successMessage} />
      { successMessage !== undefined && <Redirect to="/view-profile"/>}
      <div className="G-showcase">
     <div className="G-create-article" data-test="G-create-article">
      <div className="G-containers">
      <div className="G-actionType">
          <div className="G-action">
                <ReactFileReader data-test="G-image" handleFiles={this.handleFiles} base64>
                  <button type="button" className="setImage">
                    <i className="icofont-ui-image uploadImageIcon" />
                  </button>
                </ReactFileReader>
              </div>
            <EditorCommand />
        </div>
        <div className="G-form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="titleLabel changeTitle">Your title</label>
              <div contentEditable="true" ref={this.Title} data-test="G-input"
              name="title"
              className="G-titleEditor"
              suppressContentEditableWarning={true}>
               {single ? htmlParser(single.title) : ''}
              </div>
            </div>
            <div className="G-form-group">
              {single && single.image && (
              <div className="G-image-display">
                {image !== '' ? <img src={image.base64} alt="selected " /> : <img src={single.image ? single.image : ''} alt="selected " />}
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
                suppressContentEditableWarning={true}
              >{single ? htmlParser(single.body) : ''}</div>
            </div>
            <div className="G-form-group">
              <div className="G-publish">
                <button type="button" onClick={this.onSubmit} data-test="G-updateData">
                  <i className="icofont-brand-appstore" />
                  {' '}
                save changes
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
EditArticle.propTypes = {
  singleArticle: PropType.func.isRequired,
  articleReducer: PropType.objectOf(PropType.object).isRequired,
  updateArticle: PropType.func.isRequired,
  match: PropType.objectOf(PropType.object).isRequired,
  params: PropType.objectOf(PropType.object).isRequired
};
const mapStateToProps = state => ({
  articleReducer: state.articles
});
export default connect(mapStateToProps, {
  singleArticle, updateArticle
})(EditArticle);
