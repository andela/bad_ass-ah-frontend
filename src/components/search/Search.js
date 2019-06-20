import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Hashid from 'hashids';
import htmlParser from 'html-react-parser';
import stringParser from 'react-to-string';
import slugify from 'slugify';
import userAvatar from '../../assets/Images/icons/boy.svg';
import '../../assets/scss/_search.scss';

const propTypes = {
  item: PropTypes.objectOf(PropTypes.object).isRequired,
  searchInput: PropTypes.string.isRequired
};


class Search extends Component {
  render() {
    const hashid = new Hashid('', 10);
    const defaultImageUrl = 'https://res.cloudinary.com/badass/image/upload/v1559138338/defaultImage.jpg';
    const { item, searchInput } = this.props;
    let users; let articles;
    if (item) {
      users = item.user.slice(0, 4);
      articles = item.article.slice(0, 4);
    }
    return (
     <Fragment>
      <div className="SingleSearch">
       {users && <Fragment>
         {users.length > 0 && <div className="search-user">
           <div className="search-title">
           <i className="icofont-ui-user-group searchingTitleIcon"></i>
           <h4>People</h4>
           </div>
           <ul>
             {users.map(user => <li className="search-list-item" key={user.id}>
               <a href={`/@${slugify(user.username, '-')}/${hashid.encode(user.id)}`}>
                <div className="search-infos">
                  <img src={user.image ? user.image : userAvatar} alt="userImage" />
                  <h5>{user.username.trim() }</h5>
                </div>
               </a>
             </li>)}
           </ul>
         </div>}
       </Fragment>}
       {articles && <Fragment>
         {articles.length > 0 && <div className="search-user">
           <div className="search-title">
           <i className="icofont-brand-appstore searchingTitleIcon"></i>
           <h4>Stories</h4>
           </div>
           <ul>
             {articles.map(article => <li className="search-list-item" key={article.article_id}>
               <a href={`/story/${hashid.encode(article.article_id)}`}>
                <div className="search-infos">
                  <img src={article.image ? article.image : defaultImageUrl} alt="userImage"
                  className="searchArticleImage" />
                  <h5>{stringParser(htmlParser(article.title)).substring(0, 20)}...</h5>
                </div>
               </a>
             </li>)}
           </ul>
         </div>}
       </Fragment>}
       {item.article.length > 4 || item.user.length > 4 ? <div className="searchViewMore">
         <Link to={`/search/?search=${searchInput}`}>
        <button> <i className="icofont-long-arrow-right viewMoreIcon"></i>
        <h5 className="viewTitle">view more</h5></button></Link></div> : ''}
     </div>
     </Fragment>
    );
  }
}


Search.propTypes = propTypes;


export default Search;
