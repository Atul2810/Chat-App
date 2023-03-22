import { Avatar } from '@mui/material'
import './Sidebar.css'
import { useEffect, useState } from 'react'
import db from '../Firebase/firebase';
import { Link } from 'react-router-dom';
function SidebarChat({id, name,addnewchat}) {
    const [seed,setSeed]=useState("");
    const [lastMessage,setLastMessage]=useState("");
    useEffect(()=>{
         setSeed(Math.floor((Math.random()*5000)))
         db.collection("rooms").doc(id).collection("message").orderBy("timestamp","desc").onSnapshot(snapshot=>setLastMessage(snapshot.docs.map(doc=>doc.data())))
    }, [])
    const createnewchat=()=>{
      const room=prompt("Please Enter room name")
      if(room){
        db.collection("rooms").add({
          name:room,
        });
      }
    }

  return (
    addnewchat ? (
        <div className='sidebar__chat' onClick={createnewchat}>
            <h2 style={{marginLeft:"20px"}}>Add new chat</h2>
        </div>
    ) :
    (<Link to={`/room/${id}`} style={{textDecoration:"none",color:"black"}}>
    <div className='sidebar__chat'>
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
      <div className='sidebar__Info'>
        <h2>{name}</h2>
        <p>{lastMessage[0]?.message }</p>
      </div>
    </div>
    </Link>)
  )
}

export default SidebarChat
