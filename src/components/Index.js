/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import Slider from 'react-animated-slider';
import { connect } from 'react-redux';
import htmlParser from 'html-react-parser';
import stringParser from 'react-to-string';
import { Link } from 'react-router-dom';
import UpperCase from 'ucfirst';
import PropTypes from 'prop-types';
import Hashid from 'hashids';
import getAllArticle from '../actions/article';
import Layout from './layouts/Layout';
import LeftIcon from '../assets/Images/icons/back.svg';
import RightIcon from '../assets/Images/icons/next.svg';
import playIcon from '../assets/Images/icons/play-button.svg';
import blog3 from '../assets/Images/entertainment.jpeg';
import spinner from '../assets/Images/spinner.gif';
import defaultAvatar from '../assets/Images/icons/boy.svg';
import 'react-animated-slider/build/horizontal.css';
import '../assets/scss/_Index.scss';

export class Index extends Component {
  componentDidMount() {
    const { getAllArticle } = this.props;
    getAllArticle(1);
  }

  loadPage = (pageNumber) => {
    this.props.getAllArticle(pageNumber);
  }

  render() {
    const hashid = new Hashid('', 10);
    const defaultImageUrl = 'https://res.cloudinary.com/badass/image/upload/v1559138338/defaultImage.jpg';
    let all;
    const size = 5;
    let slide;
    const {
      allArticle: { allArticles }
    } = this.props;
    let numberOfPages = null;
    if (allArticles && allArticles.length !== 0) {
      all = allArticles[0].articles;
      slide = allArticles[0].articles.slice(0, size);
      numberOfPages = allArticles[0].metaData.totalPages;
    }

    const pagination = [];
    const currentPage = parseInt(allArticles[0] ? allArticles[0].metaData.currentPage : 1, 10);

    if (numberOfPages !== null) {
      for (let i = 1; i <= numberOfPages; i += 1) {
        const pageBtn = <span key={i} id={`page-${i}`} className={`${currentPage === i ? 'active' : ''}`} onClick={() => this.loadPage(i)}>{i}</span>;
        pagination.push(pageBtn);
      }
    }

    return (
      <Layout>
        <Fragment>
          {all !== undefined ? (
            <Fragment>
              <section className="showcase showslide">
                <Slider autoplay={3000}>
                  {slide !== undefined ? (
                    slide.map(slid => (
                      <div className="slides">
                        <div className="slide-container">
                          <div className="slide-image">
                            <div className="imgSlide">
                              <div className="blog-desc">
                                <p>{stringParser(htmlParser(UpperCase(slid.title))).substring(0, 100)}</p>
                                <Link
                                  to={`/story/${hashid.encode(slid.article_id)}`}
                                  className="moreBtn"
                                >
                                  <img src={playIcon} alt="read" className="small-icon" />
                                  Read more
                                </Link>
                              </div>
                              <img
                                src={slid.image ? slid.image : defaultImageUrl}
                                alt={slid.image}
                                className="slid"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="slides">
                      <div className="slide-container">
                        <div className="slide-image">
                          <div className="imgSlide">
                            <div className="blog-desc">
                              <p>No Story Found</p>
                              <Link to="#notfound" className="moreBtn">
                                <img src={playIcon} alt="read" className="small-icon" />
                                Read more
                              </Link>
                            </div>
                            <img src={defaultImageUrl} alt="default" className="slid" />
                          </div>
                          <img src={defaultImageUrl } alt="default" className="slid" />
                        </div>
                      </div>
                    </div>
                  )}
                </Slider>
                <div className="slides">
                  <div className="slide-container">
                    <div className="left-arrow">
                      <img src={LeftIcon} alt="" />
                    </div>
                    <div className="right-arrow">
                      <img src={RightIcon} alt="" />
                    </div>
                    <div className="slide-image">
                      <div className="imgSlide">
                        <div className="blog-desc">
                          <p>Why you should choose useState instead of useReducer</p>
                          <a href="#data" className="moreBtn">
                            <img src={playIcon} alt="read" className="small-icon" />
                            Read more
                          </a>
                        </div>
                        <img src={blog3} alt="slide1" className="slid" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="showcase">
                <div className="main-body">
                  <div className="article">
                    <h1>Recents</h1>
                    <div className="article-grid">
                      {all.map(item => (
                        <div className="b-article" key={item.article_id}>
                          <Link
                            to={{
                              pathname: `/story/${hashid.encode(item.article_id)}`,
                              state: { prevPath: window.location.pathname }
                            }}
                          >
                            <div className="article-img">
                              <img
                                src={item.image ? item.image : defaultImageUrl}
                                alt={item.image}
                              />
                            </div>
                            <div className="b-article-desc">
                              <div className="descriptions">
                                <div className="art-title">
                                  {stringParser(htmlParser(UpperCase(item.title))).substring(0, 90)}
                                </div>
                                <div className="art-author">
                                  <div className="authors-av">
                                    <div>
                                      <img
                                        src={
                                          item.authorfkey.image !== null
                                            ? item.authorfkey.image
                                            : defaultAvatar
                                        }
                                        alt=""
                                      />
                                      <h5 className="author-name">{UpperCase(item.authorfkey.username)}</h5>
                                    </div>
                                    <h5>{new Date(item.createdAt).toDateString()}</h5>
                                  </div>
                                  <div className="small-text">
                                    {stringParser(htmlParser(UpperCase(item.body))).substring(0, 100)}
                                    {'...'}
                                    <a href="#d" className="readMore">
                                      Read more
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                <div className="pagination">
                {pagination}
                </div>
                    </div>
                  </div>
                </div>
              </section>
            </Fragment>
          ) : (
            <Fragment>
              <div className="loadingSpinner">
                <img src={spinner} alt="spinner" />
              </div>
            </Fragment>
          )}
        </Fragment>
      </Layout>
    );
  }
}
Index.propTypes = {
  getAllArticle: PropTypes.func.isRequired,
  allArticle: PropTypes.objectOf(PropTypes.object).isRequired,
  allArticles: PropTypes.objectOf(PropTypes.object).isRequired
};
const mapStateToProps = state => ({
  allArticle: state.articles
});
export default connect(
  mapStateToProps,
  { getAllArticle }
)(Index);
