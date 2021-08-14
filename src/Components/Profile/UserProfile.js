import React,{useState,useContext,useEffect} from 'react';
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
import VideoProfile from './VideoProfile';
import { database } from '../../firebase';
import AddComment from'../AddComment';
import Comments from '../Comments';
import Header from '../Header';
import { AuthContext } from '../../Context/AuthProvider';
import { useHistory } from 'react-router';
import './UserProfile.css'

const useStyles = makeStyles((theme)=>({
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
     top :'75%',
    },
    mn:{
      color:'white',
      
     
    },
    tmn:{
      color:'white'
    },
    large: {
      width: theme.spacing(11),
      height: theme.spacing(11),
    },
  }));

export default function UserProfile() {
    
    const classes = useStyles();
    const history = useHistory();
    const {currentUser} = useContext(AuthContext);
    const[userData,setUserData] = useState(null);
    const[posts,setPost] = useState(null);
    const [openId, setOpenId] = useState(null);
    const handleClickOpen = (id) => {
      setOpenId(id);
    };
    const handleClose = () => {
      setOpenId(null);
    };
    useEffect(async ()=>{
        const unsub =await database.users.doc(currentUser.uid).onSnapshot((doc)=>{
            setUserData(doc.data())
        })
        console.log(userData);
    },[currentUser]);

    useEffect(async()=> {
        let post = [];
        for(let i = 0 ; i < userData?.postIds?.length;i++){
            let pid = userData.postIds[i];
            let postData = await database.posts.doc(pid).get();
            post.push(postData.data());
        }
        setPost(post);
        console.log(post);
    },[userData]);

    return (
        <>
        <Header userData={userData} />
        <div className ="profile">
            <div className = "profileData"> 
            <div className = "profile-container">
            <div className = "profileImage"> 
            <Avatar src={userData?.profileUrl} aria-label="recipe" className={classes.large}/>
            </div>
            <div className = "userDetails">{userData?.username}</div>
            </div>
            </div>

            <div className = "video-heading">Post</div>
            
            <div className = "userVideo">
                {posts==null?<CircularProgress className={classes.loader} color="secondary" />:
        <div className='Pvideo-container' id='video-container'>
          {
            posts.map((post)=>(
              <React.Fragment key={post.postId}>
                <div className='Pvideos'>
                <VideoProfile source={post.pUrl} id={post.pId}/>
                  <ChatBubbleIcon onClick={() => handleClickOpen(post.pId)} className={`${classes.ci} icon-styling`} />
                      <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pId}>
                        <MuiDialogContent>
                          <div className='dcontainer'>
                            <div className='video-part'>
                              <video  autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
                                <source src={post.pUrl} type="video/webm" />
                              </video>
                            </div>
                            <div className='info-part'>
                              <Card>
                                <CardHeader
                                  avatar={
                                    <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>
                                    </Avatar>
                                  }
                                  action={
                                    <IconButton aria-label="settings">
                                      <MoreVertIcon />
                                    </IconButton>
                                  }
                                  title={post?.uName}

                                />
                                
                                <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                <CardContent className={classes.seeComments}>
                                  
                                <Comments userData={userData} postData={post} />
                                </CardContent>
                                
                              </Card>
                              <div className='extra'>
                              <div className='likes'>
                                <Typography className={classes.typo} variant='body2'>Liked By {post?.likes?.length == 0 ? 'nobody' : ` others`}</Typography>
                                </div>
                                <AddComment  userData={userData} postData={post}/> 
                                </div>
                            </div>
                          </div>
                        </MuiDialogContent>
                      </Dialog>
                </div>

                <div className='place'></div>
              </React.Fragment>
            ))
          }

        </div>
        }
            </div>

        </div>
        
        </>
    )
}
