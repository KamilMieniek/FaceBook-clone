import React from 'react';
import './iconPanel.css';
import magnifier from '../../../assets/icons/magnifier.svg';
import tripleDot from '../../../assets/icons/tripleDot.svg';
import newRoomIcon from '../../../assets/icons/newRoomIcon.svg';
import { Icon } from '../../../components/Icon';
const IconPanel = () => {
  return (
    <div className="IconPanel">
      <div className="friends-label">Friends</div>
      <div className="icons-friend-panel">
        <Icon img={magnifier} className="svg" />
        <Icon img={tripleDot} className="svg" />
        <Icon img={newRoomIcon} className="svg" />
      </div>
    </div>
  );
};

export { IconPanel as default };
