import React from 'react';
import { ChatBar } from '../../features/chat/compontents/ChatBar';
import { RoomsContainer } from '../../features/chat/compontents/RoomsContainer';
import './HomePage.css';
export const HomePage = () => {
  return (
    <div className="homePageContainer">
      HomePage
      <RoomsContainer></RoomsContainer>
      <ChatBar>qweqe</ChatBar>
    </div>
  );
};
