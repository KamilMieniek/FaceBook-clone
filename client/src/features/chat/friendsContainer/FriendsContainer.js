import React from 'react';
import './friendsContainer.css';
import IconPanel from './IconPanel.js';
import { FriendsList } from './FriendsList';
export const FriendsContainer = () => {
  return (
    <div className="friends-container">
      <IconPanel></IconPanel>
      <FriendsList />
    </div>
  );
};

export { FriendsContainer as default };
