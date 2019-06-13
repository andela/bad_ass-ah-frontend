import React, { Component, Fragment } from 'react';
import Slider from 'react-animated-slider';
import { connect } from 'react-redux';
import htmlParser from 'html-react-parser';
import stringParser from 'react-to-string';
import { Link } from 'react-router-dom';
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
import ArticlePagination from './articles/ArticlePagination';

export class Index extends Component {
  componentDidMount() {
    const { getAllArticle } = this.props;
    getAllArticle();
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
    if (allArticles && allArticles.length !== 0) {
      all = allArticles[0].articles;
      slide = allArticles[0].articles.slice(0, size);
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
                                <p>{stringParser(htmlParser(slid.title)).substring(0, 100)}</p>
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
                                  {stringParser(htmlParser(item.title)).substring(0, 90)}
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
                                      <h5 className="author-name">{item.authorfkey.username}</h5>
                                    </div>
                                    <h5>{new Date(item.createdAt).toDateString()}</h5>
                                  </div>
                                  <div className="small-text">
                                    {stringParser(htmlParser(item.body)).substring(0, 100)}
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
                    </div>
                  </div>
                </div>
                <ArticlePagination />
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
