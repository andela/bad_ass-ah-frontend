/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import React, { Component, Fragment } from 'react';
import QueryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import htmlParser from 'html-react-parser';
import stringParser from 'react-to-string';
import Hashid from 'hashids';
import slugify from 'slugify';

import Layout from '../layouts/Layout';
import searchAll from '../../actions/search';
import '../../assets/scss/_search.scss';
import defaultAvatar from '../../assets/Images/icons/boy.svg';

export class AllSearch extends Component {
  state= {
    searchInputItem: '',
    searchItem: null,
    navigateSearch: true,
    navigationName: 'stories'
  }

  componentWillReceiveProps(props) {
    const { searchInfo } = props;
    this.setState({ searchItem: searchInfo });
  }

  componentWillMount() {
    // eslint-disable-next-line react/prop-types
    const { location, searchAll } = this.props;
    const value = QueryString.parse(location.search);
    this.setState({ searchInputItem: value.search });
    searchAll(value.search);
  }

  onSearch= (e) => {
    const data = e.target.value;
    this.setState({ searchInputItem: data });
    const { searchAll } = this.props;
    searchAll(data);
  }

  onNavigate = (e) => {
    e.preventDefault();
    this.setState({ navigateSearch: false });
    if (e.target.name === 'stories') {
      this.setState({ navigateSearch: true, navigationName: 'stories' });
    }
    if (e.target.name === 'people') {
      this.setState({ navigateSearch: true, navigationName: 'people' });
    }
  }

  render() {
    const hashid = new Hashid('', 10);
    const {
      searchInputItem, searchItem, navigateSearch, navigationName
    } = this.state;
    const defaultImageUrl = 'https://res.cloudinary.com/badass/image/upload/v1560786602/dataImage.jpg';
    return (
    <Layout display={'none'}>
     <div className="allSearch">
      <div className="searchGroup">
       <input type="text" name="searchInputItem" value={searchInputItem}
       placeholder="Search on authors heaven" onChange = {this.onSearch} />
      </div>
      <div className="search-menus">
        <ul>
          <li>
            <Link to="/search/#stories" onClick={this.onNavigate} name="stories">
            <i className="icofont-brand-appstore searchingTitleIcon"></i>
            Stories (<span className="search-total">{searchItem && searchItem.search.article.length > 0
              ? searchItem.search.article.length : 'No result'}</span>)</Link>
          </li>
          <li>
            <Link to="/search/#people" onClick={this.onNavigate} name="people">
            <i className="icofont-ui-user-group searchingTitleIcon"></i>
            People (<span className="search-total">{searchItem && searchItem.search.user.length > 0
              ? searchItem.search.user.length : 'No result'}</span>)</Link>
          </li>
        </ul>
      </div>
      <div className="search-results">
        <div className="search-results-article">
          {navigateSearch && navigationName === 'stories' ? searchItem && searchItem.search.article.length > 0 && searchItem.search.article.map(article => (
            <div className="search-articles" key={article.article_id}>
            <div className="search-per-story">
            <Link to={`/story/${hashid.encode(article.article_id)}`}>
            <div className="search-articles-image">
              {article.image && <img src={article.image}
              alt={article.image}/>}
            </div>
            <div className="search-story-title">
            {stringParser(htmlParser(article.title)).substring(0, 100)}
            </div>
            <div className="search-story-info">
             <div className="search-story-avatar">
             <img src={article.authorfkey.image ? article.authorfkey.image : defaultAvatar} alt={defaultImageUrl}/>
             </div>
             <div className="search-article-author">
               <h5>{article.authorfkey.username}</h5>
               <h5>{new Date(article.createdAt).toDateString()}</h5>
             </div>
            </div>
            <div className="search-story-body">
            {stringParser(htmlParser(article.body)).substring(0, 140)}..
            </div>
            </Link>
            </div>
            <div className="search-per-story-tag">
              {article.taglist && article.taglist.length > 0 && <Fragment>
                <h3>Tags</h3>
                <div className="search-display-tags">
               {article.taglist.map((tag, index) => <div className="disp-tags" key={index}>
                <i className="icofont-tagged"></i>
                 {tag}
              </div>)}
              </div>
              </Fragment>}
            </div>
          </div>
          )) : searchItem && searchItem.search.user.length > 0 && <div className="search-result-users">
           {searchItem.search.user.map(user => <Fragment>
            <div className="search-perUser" key={user.id}>
              <Link to={`/@${slugify(user.username, '-')}/${hashid.encode(user.id)}`}>
              <div className="perUser-backImage" style={{
                background: user.image ? `url(${user.image})` : `url(${defaultImageUrl})`,
                backgroundSize: 'cover',
                filter: 'blur(2px)'
              }}>
            </div>
            <div className="perUser-avatar">
              <div className="perUser-border">
              <img src={user.image ? user.image : defaultAvatar} alt={defaultAvatar}/>
              </div>
              <div className="perUser-info">
                <h5> {user.username} </h5>
                <h5>{ user.bio ? user.bio.substring(0, 50) : ''}</h5>
              </div>
            </div>
              </Link>
          </div>
           </Fragment>)}
        </div>}
        </div>
      </div>
     </div>
    </Layout>
    );
  }
}
AllSearch.propTypes = {
  searchAll: PropTypes.func.isRequired,
  searchInfo: PropTypes.objectOf(PropTypes.object).isRequired,
};
const mapStateToProps = state => ({
  searchInfo: state.search
});
export default connect(mapStateToProps, { searchAll })(AllSearch);
