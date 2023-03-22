import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB7IAV3ieK-bQlBMrb2BbeBPC97X1AGkIQ",
    authDomain: "chat-app-a6cb9.firebaseapp.com",
    projectId: "chat-app-a6cb9",
    storageBucket: "chat-app-a6cb9.appspot.com",
    messagingSenderId: "833861712237",
    appId: "1:833861712237:web:d9958a80112de69c5cc264"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();

  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider};

  export default db;



  