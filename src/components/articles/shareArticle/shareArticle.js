import React from 'react';
import dotenv from 'dotenv';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  EmailIcon
} from 'react-share';
import './shareArticle.scss';

dotenv.config();

export const ShareArticle = (shareArticleUrl) => {
  const url = shareArticleUrl.shareArticleUrl;
  const shareArticle = `https://authorsheaven.herokuapp.com${url}`;

  return (
    <div className="share_article_social_media">
      <FacebookShareButton className="share_article_button" url={shareArticle}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton className="share_article_button" url={shareArticle}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton
        className="share_article_button"
        url={shareArticle}
        windowWidth={750}
        windowHeight={600}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <EmailShareButton className="share_article_button" url={shareArticle} body="body">
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
};
export default ShareArticle;
