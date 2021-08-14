import React,{useState,useContext,useEffect} from 'react';
import {AuthContext} from './../../Context/AuthProvider';
import { database } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles({
    cbtn:{
        marginRight:'1%',
        marginTop:'4%'
    }
 })


function PostChat({selectUser =null }) {
    const classes = useStyles();
    const [text,setText] = useState('');
    const {currentUser}= useContext(AuthContext);
    
    const manageText =(e)=>{
        let comment = e.target.value;
        setText(comment);
    }

    const handleOnEnter = async(e)=>{
        let obj ={
           text:text,
           sender : currentUser.uid,
           reciever : selectUser.userId,
           
        }
        
        
            let sid = selectUser.userId;
            let uid = currentUser.uid;
            let chatdataSend = (await database.chats.doc(currentUser.uid).get()).data();
            let chatdataRecieve = (await database.chats.doc(sid).get()).data();
            console.log(chatdataRecieve);
            
            
             if(chatdataSend[sid] === undefined)
             { console.log('dd');
                database.chats.doc(currentUser.uid).update({
                    [sid] : [obj],
                })
             }else{
                database.chats.doc(currentUser.uid).update({
                    [sid] : [...chatdataSend[sid],obj],
                   })
             }
           
             if(chatdataRecieve[uid] === undefined)
             {
                database.chats.doc(sid).update({
                    [uid] :[obj]
                    })
             }else{
                database.chats.doc(sid).update({
                    [uid] :[...chatdataRecieve[uid],obj]
                })
             }
            
        
        setText('');
        }

    return (
        <div className = "send-chat">
             <TextField value = {text} fullWidth={true} label ='Send a chat' onChange={manageText}/>
            <IconButton onClick = {handleOnEnter} disabled ={text ===''?true:false} className ={classes.cntn} color = 'primary'> <SendIcon/></IconButton> 
        </div>
    )
}

export default PostChat
