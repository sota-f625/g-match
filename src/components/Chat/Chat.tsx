import React, { useEffect, useRef, useState } from 'react'
import "./Chat.scss"
import ChatHeader from './ChatHeader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ChatMessage from './ChatMessage ';
import { useAppSelector } from '../../app/hooks';
import { addDoc, collection, CollectionReference, DocumentData, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  }
}

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);

  const channelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  const chatMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    let collectionRef = collection(db, "channels", String(channelId), "messages");

    const collectionRefOrderBy = query(collectionRef, orderBy("timestamp", "asc"));

    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setMessages(results);
    });
  }, [channelId]);

  useEffect(() => {
    if (chatMessageRef.current) {
      chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const collectionRef: CollectionReference<DocumentData> = collection(db, "channels", String(channelId), "messages");

    await addDoc(collectionRef, { message: inputText, timestamp: serverTimestamp(), user: user,});
    setInputText("");
  };

  return (
    <div className="chat">
      {/* chatHeader */}
      <ChatHeader channelName={channelName} />
      {/* chatMessage */}
      <div className="chatMessage" ref={chatMessageRef}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.message} timestamp={message.timestamp} user={message.user}/>
        ))}
      </div>
      {/* chatInput */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input type="text" placeholder='#メッセージを送信' onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setInputText(e.target.value)
            }
            value={inputText}
          />
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