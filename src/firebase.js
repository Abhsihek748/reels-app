import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
firebase.initializeApp(
{
    apiKey: "AIzaSyA6_VLRozL7Ri6loJwtvcihRaP8NXpn46o",
    authDomain: "reels-app-590c4.firebaseapp.com",
    projectId: "reels-app-590c4",
    storageBucket: "reels-app-590c4.appspot.com",
    messagingSenderId: "630172485289",
    appId: "1:630172485289:web:141a6cd7e120ed9b4f4bb8"
  })

  export const auth = firebase.auth();
  const fireStore = firebase.firestore();

  export const database ={
    users:fireStore.collection('users'),
    posts:fireStore.collection('posts'),
    comments:fireStore.collection('comments'),
    chats : fireStore.collection('chats'),
    chatStore :fireStore.collection('chatStore'),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
  }


  export const storage = firebase.storage();
