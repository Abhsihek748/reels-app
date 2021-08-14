import React,{useState,useContext,useEffect,useRef} from 'react';
import {AuthContext} from './../../Context/AuthProvider';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    cha:{
        marginRight:'2%',
        marginTop:'2%'
    }
   })
function Chats({selectedUser=null , chats = null} ) {
    const classes = useStyles();
    const{currentUser} = useContext(AuthContext);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom()
      }, [chats]);

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
      
    return (
        
        <>
        {
            chats==null?<div>Wow So Empty</div>:
            chats.map((chat,index)=>(
                <div key={index} className='comment-div'>
                    <div className ={chat?.sender === currentUser?.uid?"send":"recieve"}>
                    <div className = "chat-design">{chat['text']}</div></div>
                </div>
            ))
        
          } 
          <div ref={messagesEndRef} />        
        </>
    )
}

export default Chats
