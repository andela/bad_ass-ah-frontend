import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import htmlParser from 'html-react-parser';
import stringParser from 'react-to-string';
import Hashids from 'hashids';
import { Link } from 'react-router-dom';
import { likeArticle, dislikeArticle } from '../../actions/voteArticle';
import { singleArticle, deleteArticle } from '../../actions/article';
import Layout from '../layouts/Layout';
import NotFound from '../NotFound';
import Comment from '../comment/comments';
import Rating from './rating/Rating';
import { isAuthenticated } from '../../helpers/Config';
import { getComments } from '../../actions/comment/comment';
import { setReadingStats } from '../../actions';
import ShareArticle from './shareArticle/shareArticle';

const hashids = new Hashids('', 10);

export class SingleArticle extends Component {
  state = {
    articleId: '',
    hasLikedClass: null,
    hasDilikedClass: null,
    articleId2: null,
    userId: '',
    prevPath: '',
    shareArticleUrl: ''
  };

  async componentWillMount() {
    const {
      match: { params, url },
      getComments
    } = this.props;
    this.setState({ articleId2: params.handle });
    const user = await isAuthenticated();
    this.setState({ userId: user.payload.id, shareArticleUrl: url }, () => {
      getComments(this.state.articleId2);
    });
  }

  getArticle = () => {
    const {
      match: { params },
      singleArticle
    } = this.props;
    this.setState({ articleId: params.handle });
    singleArticle(params.handle);
  };

  async componentDidMount() {
    await this.getArticle();
    this.setReadingStats();
    // this.props.getComments(this.state.articleId2);
  }

  componentWillReceiveProps(nextProps) {
    const { voteMessage } = nextProps.articles;
    // eslint-disable-next-line react/prop-types
    const { location } = nextProps;
    if (location !== undefined) {
      const path = location.state ? location.state.prevPath : '/';
      this.setState({ prevPath: path });
    }
    if (voteMessage === 'thanks for the support.') {
      this.setState({ hasLikedClass: 'changeColor', hasDilikedClass: null });
    }
    if (voteMessage === 'You have disliked this article.') {
      this.setState({ hasLikedClass: null, hasDilikedClass: 'changeColor' });
    }
  }

  setReadingStats = () => {
    if (this.props.isAuth) {
      this.props.setReadingStats(this.state.articleId2);
    }
  };

  likeArticle = async () => {
    const { articleId } = this.state;
    const { likeArticle } = this.props;
    await likeArticle(articleId);
    this.getArticle();
  };

  dislikeArticle = async () => {
    const { articleId } = this.state;
    const { dislikeArticle } = this.props;
    await dislikeArticle(articleId);
    this.getArticle();
  };

  destroy = (id) => {
    const { deleteArticle } = this.props;
    this.setState({ startLoading: true });
    deleteArticle(id);
  };

  render() {
    let single;
    const {
      prevPath, userId, articleId2, shareArticleUrl
    } = this.state;
    const {
      articles: { article, error, message }
    } = this.props;

    if (article !== null) if (article && article.article !== undefined) single = article.article;
    return (
      <Layout>
        {message !== '' && window.location.replace(prevPath)}
        <div className="G-showcase">
          <Fragment>
            {single !== undefined ? (
              <div className="G-create-article" data-test="G-create-article">
                <div className="G-form-group">
                  <h1 className="G-storyTitle">{stringParser(htmlParser(single.title))}</h1>
                  {userId === single.authorfkey.id && (
                    <div className="drop-article singleDrop">
                      <Link to={`/story/edit/${hashids.encode(single.article_id)}`}>
                        <button type="button" data-test="Btn-remove">
                          {' '}
                          <span>Edit</span>
                          <i className="icofont-ui-edit editIcon" />
                        </button>
                      </Link>
                      <button
                        type="button"
                        data-test="G-deleteArticle"
                        onClick={this.destroy.bind(this, hashids.encode(single.article_id))}
                      >
                        <span>Delete</span>
                        <i className="icofont-ui-delete deleteIcon" />
                      </button>
                    </div>
                  )}
                </div>
                {single.image && (
                  <div className="G-form-group">
                    <div className="G-image-display">
                      <img src={single.image} alt="selected " />{' '}
                    </div>
                  </div>
                )}
                {single.taglist !== null && single.taglist.length !== 0 ? (
                  <div className="G-form-group">
                    {single.taglist
                      && single.taglist.map(tag => (
                        <div className="G-displayTag" key={Math.random()}>
                          <div className="G-tagName"> {tag} </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  ''
                )}
                <div className="G-form-group">
                  <div id="texteditor" name="body" className="G-singleEditor">
                    {htmlParser(single.body)}
                  </div>
                </div>
                <div className="section__rating">
                  <Rating articleId={this.state.articleId2} />
                  <div className="C-like c-like-grid section__rating-like">
                    <div
                      id="like-btn"
                      className={`btn-heart ${this.state.hasLikedClass}`}
                      title="likes"
                      onClick={this.likeArticle}
                    >
                      {article.votes.hasLiked === true ? (
                        <i className="icofont-heart changeColor" />
                      ) : (
                        <i className="icofont-heart" />
                      )}
                      <div>{article.votes.likes}</div>
                    </div>
                    <div
                      id="dislike-btn"
                      className={`btn-heart ${this.state.hasDilikedClass}`}
                      title="dislikes"
                      onClick={this.dislikeArticle}
                    >
                      {article.votes.hasDisliked === true ? (
                        <i className="icofont-ui-love-broken changeColor" />
                      ) : (
                        <i className="icofont-ui-love-broken" />
                      )}
                      <div>{article.votes.dislikes}</div>
                    </div>
                  </div>
                </div>
                <ShareArticle shareArticleUrl={shareArticleUrl} />
                <Comment articleId={articleId2} />
              </div>
            ) : (
              <center>
                {error && error.errors !== undefined && <NotFound error={error.errors.body[0]} />}
              </center>
            )}
          </Fragment>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  articles: state.articles,
  isAuth: state.login.isAuthenticated
});
SingleArticle.propTypes = {
  singleArticle: PropTypes.func.isRequired,
  articles: PropTypes.objectOf(PropTypes.object).isRequired,
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  likeArticle: PropTypes.func.isRequired,
  dislikeArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  setReadingStats: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired
};
// eslint-disable-next-line max-len
export default connect(
  mapStateToProps,
  {
    singleArticle,
    likeArticle,
    dislikeArticle,
    deleteArticle,
    getComments,
    setReadingStats
  }
)(SingleArticle);
