import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllArticle from '../../actions/article';
import Layout from '../layouts/Layout';

export class AllArticles extends Component {
  componentDidMount() {
    const { getAllArticle } = this.props;
    getAllArticle();
  }

  render() {
    const { article } = this.props;
    const { articles } = article;
    return (
      <Layout>
        <Fragment>
          {articles !== undefined ? (
            <Fragment>
              {articles.length > 0 ? articles.map(article => <div key={article.id}>{article.title}</div>) : 'Not found'}
            </Fragment>
          ) : 'No article found'}
        </Fragment>
      </Layout>
    );
  }
}

AllArticles.propTypes = {
  getAllArticle: PropTypes.func.isRequired,
  article: PropTypes.func.isRequired
};
// mapStateToProps from reducer
const mapStateToProps = state => ({
  article: state.articles
});

export default connect(mapStateToProps, { getAllArticle })(AllArticles);
