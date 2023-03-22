import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicIcon from "@mui/icons-material/Mic";
import "./Chat.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../Firebase/firebase";
import firebase from "firebase/compat/app"
import { useStateValue } from "../Context/StateProvider";

function Chat() {
  const {roomId}=useParams();
  const [roomName,setRoomName]=useState('');
  const [input,setInput]=useState('');
  const [message,setMessage]=useState([]);
  const [{user},dispatch]=useStateValue();


  useEffect(()=>{
    if(roomId){
      db.collection("rooms").doc(roomId).onSnapshot(snapshot=>{
        setRoomName(snapshot.data().name);
      })
      db.collection("rooms").doc(roomId).collection("message").orderBy("timestamp","asc").onSnapshot(
        snapshot=>{
          setMessage(snapshot.docs.map(doc=>doc.data()));
        }
      )
    }
  },[roomId])


  const sendMessage=(e)=>{
   e.preventDefault();
   if(input===''){
    alert("Please Enter your message");
    return;
   }
   db.collection("rooms").doc(roomId).collection("message").add({
    name:user.displayName,
    message:input,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()
   })
   setInput("");
  }
  
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src="https://avatars.dicebear.com/api/human/123.svg" />
        <div className="chat__container">
          <div className="chat_headerInfo">
            <h2>{roomName}</h2>
            <p>
              {
                new Date(message[message.length-1]?.timestamp?.seconds*1000).toLocaleTimeString()
              }
            </p>
          </div>
          <div className="chat_headerRight">
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="chat__body">
        <div className="chat__message__size"> 
          {
            message.map(message=>{
             return <p key={message.timestamp} className={`chat__message ${user.displayName===message.name && `chat__reciever`} `}>
            <span className="chat__name">{message.name}</span>
            <span>{message.message} </span>
            <span className="chat__time">
              {
                new Date(message.timestamp?.seconds*1000).toLocaleTimeString()
              }
            </span>
          </p>
            })
          }
        </div>
      </div>
      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <AttachFileIcon />
        <form onSubmit={sendMessage}>
          <input type="text" placeholder="Type your message" value={input} onChange={(e)=>setInput(e.target.value)} />
        </form>
        <MicIcon />
      </div>

    </div>
  );
}

export default Chat;


