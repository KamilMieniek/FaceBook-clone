import React from 'react';
import './Navbar.css';
import magnifier from '../assets/icons/magnifier.svg';
import bellIcon from '../assets/icons/bellIcon.svg';
import messageIcon from '../assets/icons/message.svg';
import basicUser from '../assets/basic_user.png';
import { Icon } from '../components/Icon';
const Navbar = () => {
  return (
    <div className="navigate-container">
      <div className="logo">CloneBook</div>
      <div className="search-wrapper">
        <Icon img={magnifier} className="svg" id="input-magnifier" />
        <input placeholder="  Search in CloneBook" className="search-input" />
      </div>
      <div className="navbar-icon-panel">
        {/* <MessageIcon className="icon" /> */}

        <Icon img={bellIcon} className="svg" />
        <Icon img={messageIcon} className="svg" />
        <Icon img={basicUser} className="avatar" />
      </div>
      <div></div>
    </div>
  );
};

export { Navbar as default };
