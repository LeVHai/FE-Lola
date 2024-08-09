import React from 'react';
import './style.scss';
import { Avatar } from 'antd'; // Thư viện Ant Design cho Avatar

const MessengerItem = ({ isCurrentUser, message }) => {
  return (
    <div className={`messenger-item ${isCurrentUser ? 'position-current-user' : 'position-user'}`}>
      <Avatar />
      <div className={isCurrentUser ? 'current-user' : 'user'}>
        {message.content}
      </div>
    </div>
  );
};

export default MessengerItem;
