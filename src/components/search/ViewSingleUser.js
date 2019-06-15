/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import UpperCase from 'ucfirst';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Hashid from 'hashids';
import htmlParser from 'html-react-parser';
import stringParser from 'react-to-string';
import Layout from '../layouts/Layout';
import searchAll from '../../actions/search';
import userAvatar from '../../assets/Images/icons/boy.svg';
import '../../assets/scss/_singleUser.scss';
import '../../assets/scss/_notFound.scss';


export class ViewSingleUser extends Component {
   state = {
     searchItems: null,
     searchId: null
   }

   // eslint-disable-next-line class-methods-use-this
   componentWillReceiveProps(nextProps) {
     const { searchInfo } = nextProps;
     if (searchInfo) {
       this.setState({ searchItems: searchInfo.search.user });
     }
   }

   componentWillMount() {
     const { match: { params }, searchAll } = this.props;
     const hashid = new Hashid('', 10);
     let username;
     if (params.handle.charAt('@') === '@') {
       username = params.handle.substr(1);
       this.setState({ searchId: hashid.decode(params.handleId) });
       searchAll(username.split('-').join(' '));
     }
   }

   // eslint-disable-next-line class-methods-use-this
   render() {
     const defaultImageUrl = 'https://res.cloudinary.com/badass/image/upload/v1559138338/defaultImage.jpg';
     const { searchItems, searchId } = this.state;
     const hashid = new Hashid('', 10);
     return (
    <Layout display={'none'}>
    <div className="view-single-user">
      <div className="view-single-user-founded">
          { searchItems && searchId && searchItems.map(user => <Fragment>
            {user.id === searchId[0] && <Fragment><div className="view-single-user-infos">
          <div className="view-single-user-avatar">
            <img src={user.image ? user.image : userAvatar} alt={user.image}/>
          </div>
          <div className="view-single-user-bios">
             <div className="view-single-user-username">
                <strong style={{ fontSize: '18px' }}>@</strong>{UpperCase(user.username)}
             </div>
             <div className="view-single-user-bio">
              {user.bio}
             </div>
          </div>
        </div>
        <div className="view-single-user-articles">
            <h1 className="view-single-title-user"><i className="icofont-brand-appstore"></i> stories </h1>
           <div className="view-single-user-articles-by-one">
            {user.articles.length > 0 ? user.articles.map(articles => <div className="view-single-user-single">
             <div className="view-single-user-article-image">
              <img src={articles.image ? articles.image : defaultImageUrl}
              alt={articles.image ? articles.image : defaultImageUrl} />
             </div>
             <div className="view-single-story-infos">
              <div className="view-story-divider-info">
              <div className="view-single-story-user-avatar">
                 <img src={user.image ? user.image : userAvatar}
                 alt={user.image ? user.image : userAvatar}/>
              </div>
              <div className="story-by">
                  <h5>{user.username}</h5>
                  <p>{new Date(articles.createdAt).toDateString()}</p>
              </div>
              </div>
              <div className="view-single-story-desc">
                <div className="view-single-story-title">
                {stringParser(htmlParser(UpperCase(articles.title))).substring(0, 40)}</div>
                <div className="view-single-story-body">
                {stringParser(htmlParser(UpperCase(articles.body))).substring(0, 100)}</div>
                <div className="view-single-article-button">
                  <Link to={`/story/${hashid.encode(articles.article_id)}`}>
                   <button className="view-single-story-btn"><i className="icofont-read-book-alt more-read"></i>Read More</button>
                  </Link>
                </div>
              </div>
             </div>
             </div>) : <div>
                 No story found
             </div>}
           </div>
         </div>
         </Fragment>}
          </Fragment>)}
      </div>
    </div>
    </Layout>
     );
   }
}
ViewSingleUser.propTypes = {
  searchAll: PropTypes.func.isRequired,
  searchInfo: PropTypes.objectOf(PropTypes.object).isRequired
};
export const mapStateToProps = state => ({
  searchInfo: state.search
});
export default connect(mapStateToProps, { searchAll })(ViewSingleUser);
