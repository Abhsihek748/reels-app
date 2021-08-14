
import './App.css';
import Signup from './Components/Signup'
import AuthProvider from './Context/AuthProvider'; 
import Login from './Components/Login';
import Ioa from './Components/Ioa';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Feed from './Components/Feed' ;
import UserProfile from './Components/Profile/UserProfile';
import Chat from './Components/chat/Chat';

function App() {
  return (
    <Router>
    <AuthProvider>
    <Switch>
      <PrivateRoute exact path='/' component={Feed}/>
      <PrivateRoute exact path='/profile' component = {UserProfile} /> 
      <PrivateRoute exact path = '/chat' component = {Chat}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/login' component={Login}/>
    </Switch>
    </AuthProvider>
  </Router>
  );
}

export default App;
