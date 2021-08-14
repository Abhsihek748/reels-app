import React,{useState,useContext,useEffect} from 'react';
import {AuthContext} from './../../Context/AuthProvider';
import { database } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useHistory } from 'react-router';
import Header from './../Header';
import Chats from './Chats';
import PostChat from './PostChat';
const useStyles = makeStyles({
    root: {
      width: '100%',
      padding: '0px'
    },
    loader: {
      position: 'absolute',
      left: '50%',
      top: '50%'
    },
    typo: {
      marginLeft: '2%'
    },
    vac: {
      marginLeft: '3.5%',
      color: '#8e8e8e',
      cursor:'pointer'
    },
    dp: {
      marginLeft: '2%'
    },
    cc: {
      height: '50vh',
      overflowY: 'auto'
    },
    seeComments:{
      height:'54vh',
      overflowY:'auto'
    },
    ci:{
    
      color: 'white',
      cursor:'pointer',
     left :'29%',
     top :'55%',
    },
    mn:{
      color:'white',
      
     
    },
    tmn:{
      color:'white'
    }
  
  });

export default function ChatBox({selectedUser = null, chatData = null}) {
    const classes = useStyles();
    const history = useHistory();
    const {currentUser} = useContext(AuthContext);
    const[selectUser,setSelectuser] = useState(null);
    const[chats,setChats] = useState(null);
   console.log(selectUser);
 
    useEffect(async () => {
       if(selectedUser == null){
         return ;
       }
       
      let doc = await database.users?.doc(selectedUser)?.get();
        setSelectuser(doc.data())

        let data = chatData[selectedUser];

   
        setChats(data);
       
    }, [selectedUser,chatData]);

    return (
        <>
                    <Card className = "chat-card">
                        <CardHeader
                            avatar={
                    <Avatar src={selectUser?.profileUrl} aria-label="recipe" className={classes.avatar}>
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title={selectUser?.username}

                    />
                    
                    <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                    <CardContent className={classes.seeComments}>
                        
                    <Chats selectedUser={selectedUser} chats = {chats}/>
                    </CardContent>
                    
                    </Card>

                    <PostChat selectUser = {selectUser}/>
                    </>
    )
}
