import React from 'react';
import './Friend.css';
export const Friend = ({ img, name }) => {
  return (
    <div className="friend">
      <img src={img} alt="No avatar" />
      <p>{name}</p>
    </div>
  );
};

export { Friend as default };
