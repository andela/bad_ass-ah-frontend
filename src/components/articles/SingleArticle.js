/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import htmlParser from 'html-react-parser';
import { singleArticle } from '../../actions/article';
import { likeArticle, dislikeArticle } from '../../actions/voteArticle';
import Layout from '../layouts/Layout';
import NotFound from '../NotFound';
import Comment from '../comment/comments';

export class SingleArticle extends Component {
  state = {
    articleId: '',
    hasLikedClass: null,
    hasDilikedClass: null
  };

  getArticle = () => {
    const {
      match: { params },
      singleArticle
    } = this.props;
    this.setState({ articleId: params.handle });
    singleArticle(params.handle);
  };

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.getArticle();
  }

  componentWillReceiveProps(nextProps) {
    const { voteMessage } = nextProps.articles;
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
  };

  dislikeArticle = async () => {
    const { articleId } = this.state;
    const { dislikeArticle } = this.props;
    await dislikeArticle(articleId);
    this.getArticle();
  };

  render() {
    const { articleId } = this.state;
    let single;
    const {
      articles: { article, error }
    } = this.props;
    if (article !== null) if (article && article.article !== undefined) single = article.article;

    return (
      <Layout>
        <div className="G-showcase">
          <div>
            {single !== undefined ? (
              <div className="G-create-article" data-test="G-create-article">
                <div className="G-form-group">
                  <h1 className="G-storyTitle">{single.title}</h1>
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
                <div className="C-like c-like-grid">
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
                <Comment articleId={articleId} />
              </div>
            ) : (
              <center>
                {error && error.errors !== undefined && <NotFound error={error.errors.body[0]} />}
              </center>
            )}
          </div>
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
  dislikeArticle: PropTypes.func.isRequired
};
// eslint-disable-next-line max-len
export default connect(
  mapStateToProps,
  { singleArticle, likeArticle, dislikeArticle }
)(SingleArticle);
