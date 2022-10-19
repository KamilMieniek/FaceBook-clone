import React from 'react';
import { Icon } from './Icon';
import dots from '../assets/icons/tripleDot.svg';
import likeIcon from '../assets/icons/likeIcon.svg';
import commentIcon from '../assets/icons/commentIcon.svg';
import shareIcon from '../assets/icons/shareIcon.svg';

import './Post.css';
export const Post = (props) => {
  return (
    <div className="post-container">
      <div className="post-top-panel">
        <div className="post-top-panel-left">
          <Icon img={`${props.img}`} />
          <div>
            <p>{props.username}</p>
            {props.date}
          </div>
        </div>
        <Icon img={`${dots}`} size="small" />
      </div>
      <div className="post-description-panel">{props.description}</div>
      <div className="image-container">
        <img src={`${props.gallery}`} alt="boner" />
      </div>
      <div className="post-bottom-panel">
        <div className="likes-counter">
          {props?.likes > 0 ? (
            <>
              <Icon img={`${likeIcon}`} className="small-icon" size="small" />{' '}
              {props.likes}
            </>
          ) : (
            ''
          )}
        </div>
        <div className="comments-counter">
          {props?.comments > 0 ? (
            <>
              {props.comments} <p> Komentarzy</p>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <hr className="style-two"></hr>
      <div className="post-option-panel">
        <div className="option-button">
          <Icon img={likeIcon} size="small" className="svg" />
          <p> Like</p>
        </div>
        <div className="option-button">
          <Icon img={commentIcon} size="small" className="svg" />
          <p>Comment</p>
        </div>
        <div className="option-button">
          <Icon img={shareIcon} size="small" className="svg" />
          <p>Udostępnij</p>
        </div>
      </div>
    </div>
  );
};

export { Post as default };
