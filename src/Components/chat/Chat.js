import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from './../../Context/AuthProvider';
import { database } from '../../firebase';
import './chat.css';
import ChatBox from './ChatBox';
import Header from '../Header';
import { Avatar } from '@material-ui/core';

export default function Chat() {
    const [selectedUser,selectUser] = useState(null);
    const[users,setUsers]= useState(null);
    const {currentUser} = useContext(AuthContext);
   const[chatData ,setChatData] = useState(null);
    const[userData,setUserData] = useState(null);

    useEffect(()=>{
        let uarr=[];
        const unsub = database.users.orderBy('createdAt','desc').onSnapshot(querySnapshot=>{
          uarr=[];
          querySnapshot.forEach((doc)=>{
            let data = {...doc.data()}
            if(data.userId !== currentUser.uid)
            uarr.push(data)
            else{
              setUserData(data);
            }
          })
          setUsers(uarr);

          return unsub;
    })
    return unsub;
},[currentUser])

 useEffect(()=>{
  let unsub =  database.chats.doc(currentUser.uid).onSnapshot(async(doc)=>{
    
   let  data = doc.data();
     setChatData(data);

  })
  return unsub;
  },[currentUser])
    return (
      <>
      <Header userData = {userData}/>
        <div className = "chat">
            <div className = "users">
                {  users == null ? <div></div>:
                users.map((user)=>(
                <div className = "user" id = {user.userId} onClick = {()=>selectUser(user.userId)}>
                 <Avatar src = {user.profileUrl} className ="user-icon"/> 
                 <div className="user-name">{user.username}</div>
                </div>))
                }
            
            </div>
            <div classname="chat-box" chatData = {chatData}>

            <ChatBox selectedUser = {selectedUser} chatData = {chatData}/>
          
            </div>
            
        </div>
        </>
    )
}
