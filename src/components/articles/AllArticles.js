import React, { useEffect, Fragment } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllArticle from '../../actions/article';
import Navbar from '../layouts/navbar';

const AllArticles = ({ getAllArticle, article: { articles } }) => {
  useEffect(() => {
    getAllArticle();
  }, [getAllArticle]);
  return (
    <Navbar>
      <Fragment>
        {articles !== undefined ? (
          <Fragment>
            {articles.length > 0 ? articles.map(article => <div key={article.id}>{article.title}</div>) : 'Not found'}
          </Fragment>
        ) : 'No article found'}
      </Fragment>
    </Navbar>
  );
};

AllArticles.propTypes = {
  getAllArticle: propTypes.func.isRequired
};
// mapStateToProps from reducer
const mapStateToProps = state => ({
  article: state.articles
});

export default connect(mapStateToProps, { getAllArticle })(AllArticles);
