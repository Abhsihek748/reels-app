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
      height : '40vh',
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
        paddingBottom :'3rem'
      }

}));
function Login() {
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const history = useHistory();
    const {login,currentUser} =useContext(AuthContext);

    const classes = useStyles();

    const handleLogin =async (e)=>{
        e.preventDefault();
        try{
        setLoading(true);
        await login(email,password);
        setLoading(false);
        history.push('/');

    }
    catch(err){
        setError(err)
        setTimeout(()=>setError(''),2000);
        setLoading(false);
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
     
      <form className={classes.input} noValidate autoComplete="off" onSubmit={handleLogin}  >
      <TextField id="outlined-basic"  variant="outlined" size="small" label="Email" type="Email" onChange={(e)=>setEmail(e.target.value)} />
      <TextField id="outlined-password-input"  variant="outlined" size="small" 
         label="Password"
          type="password"
          autoComplete="current-password"
           onChange={(e)=>setPassword(e.target.value)} />
        <Button variant="contained" type='submit' disabled={loading}>
        Login
        </Button>    
          {error?<h1>{error}</h1>:<></>}
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
          Don't have an account ?
          <a href="/Signup"> SignUp</a>
        </Typography>
      </CardContent>
      </Card>
        </>
    )
}

export default Login