import React, { useEffect} from 'react'
import './App.css'
import SideBar from './Component/Sidebar/Sidebar'
import Chat from './Component/Chat/Chat'
import  Login  from './Component/Login/Login'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useStateValue } from './Component/Context/StateProvider'
import { auth } from './Component/Firebase/firebase'
function App() {
  
  const [{user},dispatch]=useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      dispatch({
        type:"SET_USER",
        user:user,
      })
    })
    
  })
  return (
    <BrowserRouter>
    <div className='App'>
      {(!user) ? (<Login/>) :(
      <div className="app__body">
        <SideBar/>
        <Routes>
        <Route exact path='/' element={<Chat/>}/>
        <Route  path='/room/:roomId' element={<Chat/>}/>
        </Routes>
      </div>
      )}
    </div>
    </BrowserRouter>
    
  
  )
}

export default App
