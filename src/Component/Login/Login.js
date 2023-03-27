// import React from 'react'
import { auth, provider } from '../Firebase/firebase'
import './Login.css'
import { useStateValue } from '../Context/StateProvider'
function Login() {
  const [{},dispatch]=useStateValue();
  const SignIn=()=>{
    auth.signInWithPopup(provider).then(result=>{
      dispatch({
        type:"SET_USER",
        user:result.user,
      })
      console.log(result.user);
    }).catch(error=>alert(error))
  }
  return (
   <div className="Login__Wrapper">
    <div className="Login">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png" alt="" />
        <h2>Sign in to Whatsapp</h2>
        <button onClick={SignIn}>Login with Gmail</button>
    </div>
   </div>
  )
}

export default Login
