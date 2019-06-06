import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import htmlParser from 'html-react-parser';
import stringParser from 'react-to-string';
import Hashids from 'hashids';
import { Link, Redirect } from 'react-router-dom';
import { likeArticle, dislikeArticle } from '../../actions/voteArticle';
import { singleArticle, deleteArticle } from '../../actions/article';
import Layout from '../layouts/Layout';
import NotFound from '../NotFound';
import { isAuthenticated } from '../../helpers/Config';
import Loading from '../layouts/Loading';

const hashids = new Hashids('', 10);

export class SingleArticle extends Component {
  state={
    articleId: '',
    hasLikedClass: null,
    hasDilikedClass: null,
    userId: '',
    prevPath: '',
    startLoading: false
  }

  getArticle = () => {
    const { match: { params }, singleArticle } = this.props;
    this.setState({ articleId: params.handle });
    singleArticle(params.handle);
  }

  async componentDidMount() {
    const user = await isAuthenticated();
    this.setState({ userId: user.payload.id });
    this.getArticle();
  }

  componentWillReceiveProps(nextProps) {
    const { voteMessage } = nextProps.articles;
    // eslint-disable-next-line react/prop-types
    const { location } = nextProps;
    if (location !== undefined) {
      const path = location.state !== undefined ? location.state.prevPath : '/';
      this.setState({ prevPath: path });
    }
    if (voteMessage === 'thanks for the support.') {
      this.setState({ hasLikedClass: 'changeColor', hasDilikedClass: null });
    }
    if (voteMessage === 'You have disliked this article.') {
      this.setState({ hasLikedClass: null, hasDilikedClass: 'changeColor' });
    }
  }

likeArticle = async () => {
  const { articleId } = this.state;
  const { likeArticle } = this.props;
  await likeArticle(articleId);
  this.getArticle();
}

dislikeArticle = async () => {
  const { articleId } = this.state;
  const { dislikeArticle } = this.props;
  await dislikeArticle(articleId);
  this.getArticle();
}

destroy= (id) => {
  const { deleteArticle } = this.props;
  this.setState({ startLoading: true });
  deleteArticle(id);
}

render() {
  let single;
  const { userId, prevPath, startLoading } = this.state;
  const { articles: { article, error, message } } = this.props;
  if (article !== null) if (article && article.article !== undefined) single = article.article;
  return (
      <Layout>
        <Loading loading={startLoading}/>
        { message !== '' && <Redirect to={prevPath} />}
        <div className="G-showcase">
          <Fragment>
            {single !== undefined ? (
              <div className="G-create-article" data-test="G-create-article">
                <div className="G-form-group">
                  <h1 className="G-storyTitle">{stringParser(htmlParser(single.title))}</h1>
                  {userId === single.authorfkey.id && <div className="drop-article singleDrop">
                    <Link to={`/story/edit/${hashids.encode(single.article_id)}`}>
                    <button type="button" data-test="Btn-remove" > <span>Edit</span>
                    <i className="icofont-ui-edit editIcon"></i></button>
                    </Link>
                    <button type="button" data-test="G-deleteArticle"
                    onClick={this.destroy.bind(this, hashids.encode(single.article_id))}>
                     <span>Delete</span>
                    <i className="icofont-ui-delete deleteIcon"></i></button>
                    </div>}
                </div>
                {single.image && (
                <div className="G-form-group">
                  <div className="G-image-display">
                    <img src={single.image} alt="selected " />
                    {' '}
                  </div>
                </div>
                )}
                {single.taglist !== null && single.taglist.length !== 0
                  ? (
                    <div className="G-form-group">
                      {single.taglist && single.taglist.map(tag => (
                        <div
                          className="G-displayTag"
                          key={Math.random()}
                        >
                          <div className="G-tagName">
                            {' '}
                            {tag}
                            {' '}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : '' }
                <div className="G-form-group">
                  <div id="texteditor" name="body" className="G-singleEditor">{htmlParser(single.body)}</div>
                </div>
                <div className="C-like c-like-grid">
          <div id="like-btn" className={`btn-heart ${this.state.hasLikedClass}`} title="likes" onClick={this.likeArticle} >
          {article.votes.hasLiked === true ? <i className="icofont-heart changeColor"></i> : <i className="icofont-heart"></i>}
          <div>{article.votes.likes}</div>
          </div>
          <div id="dislike-btn" className={`btn-heart ${this.state.hasDilikedClass}`} title="dislikes" onClick= {this.dislikeArticle}>
          {article.votes.hasDisliked === true ? <i className="icofont-ui-love-broken changeColor"></i> : <i className="icofont-ui-love-broken"></i>}
          <div>{article.votes.dislikes}</div>
          </div>
          </div>
              </div>
            ) : (
              <center>
                {error && error.errors !== undefined
          && <NotFound error={error.errors.body[0]} />}
              </center>
            )}
          </Fragment>
        </div>
      </Layout>
  );
}
}
const mapStateToProps = state => ({
  articles: state.articles
});
SingleArticle.propTypes = {
  singleArticle: PropTypes.func.isRequired,
  articles: PropTypes.objectOf(PropTypes.object).isRequired,
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  likeArticle: PropTypes.func.isRequired,
  dislikeArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired
};
// eslint-disable-next-line max-len
export default connect(mapStateToProps, {
  singleArticle,
  likeArticle,
  dislikeArticle,
  deleteArticle
})(SingleArticle);
