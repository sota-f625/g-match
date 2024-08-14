import React, { useState } from 'react'
import "./Chat.scss"
import ChatHeader from './ChatHeader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ChatMessage from './ChatMessage ';
import { useAppSelector } from '../../app/hooks';
import { addDoc, collection, CollectionReference, DocumentData, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");

  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const collectionRef: CollectionReference<DocumentData> = collection(db, "channels", String(channelId), "messages");

    await addDoc(collectionRef, { message: inputText, Timestamp: serverTimestamp(), user: user,});
  };

  return (
    <div className="chat">
      {/* chatHeader */}
      <ChatHeader channelName={channelName} />
      {/* chatMessage */}
      <div className="chatMessage">
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </div>
      {/* chatInput */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input type="text" placeholder='#メッセージを送信' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}/>
          <button type ="submit" className="chatInputButton" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>
            send
          </button>
        </form>

        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <SentimentSatisfiedAltIcon />
        </div>
      </div>
    </div>
  )
}

export default Chat