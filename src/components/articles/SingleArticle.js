import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import htmlParser from 'html-react-parser';
import { singleArticle } from '../../actions/article';
import Layout from '../layouts/Layout';
import NotFound from '../NotFound';

export class SingleArticle extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { match: { params }, singleArticle } = this.props;
    singleArticle(params.handle);
  }

  render() {
    let single;
    const { articles: { article, error } } = this.props;
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
                  <div id="texteditor" name="body">{htmlParser(single.body)}</div>
                </div>
              </div>
            ) : (
              <center>
                {error && error.errors !== undefined
          && <NotFound error={error.errors.body[0]} />}
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
  articles: PropTypes.objectOf(PropTypes.object).isRequired
};
export default connect(mapStateToProps, { singleArticle })(SingleArticle);
