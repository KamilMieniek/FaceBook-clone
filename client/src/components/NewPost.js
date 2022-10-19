import React from 'react';
import { Icon } from './Icon';

import './NewPost.css';
import photoIcon from '../assets/icons/photo.svg';
import emoji from '../assets/icons/emojiIcon.svg';
import baseuser from '../assets/basic_user.png';
const NewPost = ({ img }) => {
  return (
    <div className="new-post-container">
      <div className="new-post-input-container">
        <Icon img={`${baseuser}`} />
        <input
          type="text"
          placeholder="  What's up Kamil?"
          className="new-post-input"
        />
      </div>
      <hr className="style-two" />
      <div className="new-post-options">
        <Icon img={`${photoIcon}`} />
        <Icon img={`${emoji}`} />
      </div>
    </div>
  );
};

export { NewPost as default };
