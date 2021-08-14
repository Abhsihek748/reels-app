import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AddComment.css';
import { database } from '../firebase';
const useStyles = makeStyles({
   cbtn:{
       marginRight:'1%',
       marginTop:'4%'
   }
})
export default function AddComment({userData=null , postData=null}) {

    const classes = useStyles();
    const [text,setText] = useState('');
    const manageText =(e)=>{
        let comment = e.target.value;
        setText(comment);
    }
    const handleOnEnter = (e)=>{
     let obj = {
         text:text,
         uName :userData.username,
         url:userData.profileUrl,
     }

     database.comments.add(obj).then(docref =>{
         database.posts.doc(postData.postId).update({
             comments :[...postData.comments ,docref.id]
         })
     })
     .catch(e=>{
        console.log(e+" ");
    })
    setText('');


    }
    return (
        <div className = 'emojibox'>
            <TextField value = {text} fullWidth={true} label ='Add a Comment' onChange={manageText}/>
            <Button onClick = {handleOnEnter} disabled ={text ===''?true:false} className ={classes.cntn} color = 'primary'> Post</Button>
            
        </div>
    )
}
