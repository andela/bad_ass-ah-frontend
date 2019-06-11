import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Hashid from 'hashids';
import htmlParser from 'html-react-parser';
import stringParser from 'react-to-string';
import PropTypes from 'prop-types';
import Layout from '../../layouts/Layout';
import * as actions from '../../../actions';
import Spinner from '../../layouts/Spinner';

const hashId = new Hashid('', 10);

export class ReportedArticles extends Component {
  componentDidMount = () => {
    this.props.onGetReportedArticles();
  }

  render() {
    const { isGettingReportedArticle, reportedArticles, errorGettingReportedArticles } = this.props;

    const layoutReportedArticles = [];
    if (reportedArticles !== null) {
      for (let i = 0; i < reportedArticles.length; i += 1) {
        const articleId = hashId.encode(reportedArticles[i].articleId);
        const title = stringParser(htmlParser(reportedArticles[i].article.title));
        const layout = <div className='report__reported-nav-wrapper'>
          <Link to={`/story/${articleId}`} className='report__reported--nav-link'>
            <div className='report__reported--nav-link__section'>
              <span>Article:</span>
              <span className='report__reported--nav-link__value'>{title}</span>
            </div>
            <div className='report__reported--nav-link__section'>
              <span>Report type:</span>
              <span className='report__reported--nav-link__value'>{reportedArticles[i].reportType.type}</span>
            </div>
            <div className='report__reported--nav-link__section'>
              <span>Comment:</span>
              <p className='report__reported--nav-link__value'>{reportedArticles[i].comment}</p>
            </div>
          </Link>
        </div>;

        layoutReportedArticles.push(layout);
      }
    }

    let loadingSpinner = null;
    if (isGettingReportedArticle) {
      loadingSpinner = <Spinner />;
    }

    let tittle = null;
    if (!isGettingReportedArticle && errorGettingReportedArticles === null) {
      tittle = 'Reported articles';
    }

    let displayError = null;
    if (errorGettingReportedArticles !== null) {
      displayError = <p className='report__error report__reported__error'>{errorGettingReportedArticles}</p>;
    }

    return (
      <Layout>
        <div className='report__reported-wrapper'>
          <h2 className='report__reported-wrapper--title'>{tittle}</h2>
          {displayError}
          <div className='report__reported'>
            {loadingSpinner}
            {layoutReportedArticles}
          </div>
        </div>
      </Layout>
    );
  }
}

export const mapStateToProps = state => ({
  isGettingReportedArticle: state.reportArticle.isGettingReportedArticle,
  reportedArticles: state.reportArticle.reportedArticles,
  errorGettingReportedArticles: state.reportArticle.errorGettingReportedArticles
});

export const mapDispatchToProps = dispatch => ({
  onGetReportedArticles: () => dispatch(actions.getReportedArticles())
});

ReportedArticles.propTypes = {
  isGettingReportedArticle: PropTypes.bool,
  reportedArticles: PropTypes.array,
  errorGettingReportedArticles: PropTypes.string,
  onGetReportedArticles: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportedArticles);
