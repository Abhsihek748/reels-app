import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../Context/AuthProvider';
import { storage,database } from '../firebase';
import {useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
      margin:'0 auto',
      marginTop:'12vh',
      maxWidth: 345,
      height : '50vh',
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      padding:'1rem',
  },
  root1: {
    margin:'0 auto',
    marginTop:'2vh',
    maxWidth: 345,
    height : '5vh',
    display:'flex',
    alignItems :'center',
    justifyContent :'center',
    flexDirection:'column'
    
},
  media: {
    height: '4rem',
   
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  input: {
      display:"flex",
      flexDirection:'column',
      alignItems:"center",
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
      height:'30px',
      border :'red',
      padding:'3px',
    }
},
    button: {
        margin: theme.spacing(1),
        position:'absolute',
        zIndex :1,
          height:'2rem'
      },
    upload :{
    position: 'relative'
      },
      absolute: {
     position:'absolute',
     zIndex:2,
     opacity:0,
     height:'2.5rem',
     
      }
      ,text:{
        marginLeft :'1rem',
      }

}));
function Signup() {
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const [name,setName] =useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const history = useHistory();
    const [file,setFile] = useState(null)
    const {signup,currentUser} =useContext(AuthContext);
    console.log(signup);

    const classes = useStyles();

    const handleSignup =async (e)=>{
        e.preventDefault();
        try{
        setLoading(true);
        let res = await signup(email,password);
        let uid = res.user.uid;
        console.log(uid); 
        const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
        // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
        // fn 1 -> progress tracking
        // fn2 -> error
        // fn3 -> success
        uploadTaskListener.on('state_changed',fn1,fn2,fn3);
        function fn1(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');         
        }
        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false)
        }
        async function fn3(){
            let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
            console.log(downloadUrl);
          await database.users.doc(uid).set({
                email:email,
                userId:uid,
                username:name,
                createdAt:database.getCurrentTimeStamp(),
                profileUrl:downloadUrl,
                postIds:[],
                
            })
            await database.chats.doc(uid).set({});
            setLoading(false);
            console.log('User has Signed up');
            history.push("/");
        }
    
      
    }
    catch(err){
        setError(err)
        setTimeout(()=>setError(''),2000);
        setLoading(false)
    }
    }
    const handleFileSubmit=(e)=>{
        let file = e.target.files[0];
        console.log(file);
        if(file!=null)
        {
            setFile(file)
        }
    }
    useEffect(()=>{
      if(currentUser)
      {
        history.push('/')
      }
    },[])
    return (
        <>
         <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNiLGgflLB3N5jWq1_X66qfN96cv4dnqg1rMzEjg3E_zq6Qhc5ayG0unexwIP2DabYMg&usqp=CAU"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className = "classes.text">
          Sign in to see photos and videos from your friends
        </Typography>
      </CardContent>
     
      <form className={classes.input} noValidate autoComplete="off" onSubmit={handleSignup}  >
      <TextField id="outlined-basic" margin="dense" variant="outlined" size="small" label = "Name" type = "UserName" onChange={(e)=>setName(e.target.value)} />
      <TextField id="outlined-basic"  variant="outlined" size="small" label="Email" type="Email" onChange={(e)=>setEmail(e.target.value)} />
      <TextField id="outlined-password-input"  variant="outlined" size="small" 
         label="Password"
          type="password"
          autoComplete="current-password"
           onChange={(e)=>setPassword(e.target.value)} />
           <div className={classes.upload}>
           <input className={classes.absolute} type='file' accept='image/*' onChange={handleFileSubmit} />  
           <Button 
       variant="outlined"  color="secondary"
        className={classes.button}
        startIcon={<CloudUploadIcon />} >
        Upload Profile Image
      </Button>
           </div>
      <Button variant="contained" type='submit' disabled={loading}>
     Sign Up
    </Button>
    </form>
     
    <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className = "classes.text" >
          By Signing up,you are agreeing to our Terms,Data Policy and Cookie Policy
        </Typography>
      </CardContent>
    </Card>

    <Card className={classes.root1}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Have an account ?
          <a href="/login">  Login In</a>
        </Typography>
      </CardContent>
      </Card>
        </>
    )
}

export default Signup