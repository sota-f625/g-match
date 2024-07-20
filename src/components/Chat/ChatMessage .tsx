import React from 'react'
import "./ChatMessage.scss"
import { Avatar } from '@mui/material';

const ChatMessage  = () => {
  return (
    <div className='message'>
      <Avatar />
      <div className="messageInfo">
        <h4>
          仮置き名前
          <span className='messageTimestamp'>2024/12/12</span>
        </h4>

        <p>メッセージ本文</p>
      </div>
    </div>
  )
}

export default ChatMessage 