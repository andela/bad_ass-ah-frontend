import React, { Component, Fragment } from 'react';
import Slider from 'react-animated-slider';
import { connect } from 'react-redux';
import htmlParser from 'html-react-parser';
import stringParser from 'react-to-string';
import PropTypes from 'prop-types';
import Hashid from 'hashids';
import getAllArticle from '../actions/article';
import Layout from './layouts/Layout';
import LeftIcon from '../assets/Images/icons/back.svg';
import RightIcon from '../assets/Images/icons/next.svg';
import playIcon from '../assets/Images/icons/play-button.svg';
import blog2 from '../assets/Images/blog2.jpg';
import blog3 from '../assets/Images/entertainment.jpeg';
import blog1 from '../assets/Images/blog3.jpg';
import defaultAvatar from '../assets/Images/icons/boy.svg';
import 'react-animated-slider/build/horizontal.css';

export class Index extends Component {
  componentDidMount() {
    const { getAllArticle } = this.props;
    getAllArticle();
  }

  render() {
    const hashid = new Hashid('', 10);
    const defaultImageUrl = 'https://res.cloudinary.com/badass/image/upload/v1559138338/defaultImage.jpg';
    let all;
    const { allArticle: { allArticles } } = this.props;
    if (allArticles && allArticles.length !== 0) all = allArticles[0].articles;
    return (
    <Layout>
      <Fragment>
        {all
          ? (
            <Fragment>
              <section className="showcase showslide">
                <Slider autoplay={3000}>
                  <div className="slides">
                    <div className="slide-container">
                      <div className="slide-image">
                        <div className="imgSlide">
                          <div className="blog-desc">
                            <p>
                          Eating healthy does NOT have to be boring.
                            There is a massive amount of foods out there that are both healthy
                            and tasty. Here are 50 incredibly healthy foods. Most of them
                            are surprisingly delicious.
                            </p>
                            <a href="#data" className="moreBtn">
                              <img src={playIcon} alt="read" className="small-icon" />
                            Read more
                            </a>
                          </div>
                          <img src={blog2} alt="slide1" className="slid" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slides">
                    <div className="slide-container">
                      <div className="slide-image">
                        <div className="imgSlide">
                          <div className="blog-desc">
                            <p>
                            Are you looking for a free, easy, step-by-step guide on how to start a
                            blog?
                            My free guide on this page will show you how to create a blog
                            that is beautiful and functional, all in an easy step-by-step
                            tutorial (with pictures).
                            </p>
                            <a href="#data" className="moreBtn">
                              <img src={playIcon} alt="read" className="small-icon" />
                            Read more
                            </a>
                          </div>
                          <img src={blog1} alt="slide1" className="slid" />
                        </div>
                      </div>
                    </div>
                  </div>
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
                          <p>
                          Why you should choose useState instead of useReducer
                          </p>
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
                          <a href={`/story/${hashid.encode(item.article_id)}`}>
                            <div className="article-img">
                              <img
                                src={item.image ? item.image : defaultImageUrl}
                                alt={item.image}
                              />
                            </div>
                            <div className="b-article-desc">
                              <div className="descriptions">
                                <div className="art-title">
                                  {item.title.substring(0, 90)}
                                </div>
                                <div className="art-author">
                                  <div className="authors-av">
                                    <div>
                                      <img src={defaultAvatar} alt="" />
                                      <h5 className="author-name">{item.authorfkey.username}</h5>
                                    </div>
                                    <h5>{new Date(item.createdAt).toDateString()}</h5>
                                  </div>
                                  <div className="small-text">
                                    {stringParser(htmlParser(item.body)).substring(0, 100)}
                                    {'...'}
                                    <a href="#d" className="readMore">Read more</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </Fragment>
          )
          : 'please wait ....'}
      </Fragment>
    </Layout>
    );
  }
}
Index.propTypes = {
  getAllArticle: PropTypes.func.isRequired,
  allArticle: PropTypes.objectOf(PropTypes.object).isRequired
};
const mapStateToProps = state => ({
  allArticle: state.articles,
});
export default connect(mapStateToProps, { getAllArticle })(Index);
