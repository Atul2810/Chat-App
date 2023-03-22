import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useState, useEffect } from "react";
import db from "../Firebase/firebase";
import { useStateValue } from "../Context/StateProvider";
import firebase from "firebase/compat/app";

function SideBar() {

const [{user},dispatch]=useStateValue();
const [rooms,setRooms]=useState([]);
  useEffect(()=>{
    db.collection("rooms").onSnapshot(snapshot=>{
      setRooms(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data(),
      })))
    })
  },[])


  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} onClick={e=>firebase.auth().signOut()}/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addnewchat />
        {
          rooms.map((room)=>{
             return <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
          })
        }
       
      </div>
    </div>
  );
}

export default SideBar;
