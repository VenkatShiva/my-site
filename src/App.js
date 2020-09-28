/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Component, useContext }  from 'react';
import './App.css';
import apis from './components/callApi';
import Login from './components/Login';
import ProtectedRoute from './components/protectedRoute';
import Loading from './components/Loading';
import HomePage from './components/HomePage';
import Profile from './components/Profile/Profile.js';
import Context from './contextProviders/emailProvider';
import ToastMessage from './components/ToastMessage';
// import Dummy,{ getRandomNumber } from './utils';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const [isLoggedin, setLog] = useState(false);
  const [presentState, setLoading] = useState('loading');
  const [userEmail, setEmail] = useState('');
  const ToastContext = useContext(Context.ToastContext); 
  // console.log('its hre==>',ToastContext);
  useEffect( () => {
    const getData = async () => {
      const response = await apis.isLoggedIn();
      if( response.status === 200 ){
        if(response.login){
          setLog(true);
          setEmail(response.email);
          setLoading('finish');
          pushNotis('success', response.email);
        } else {
          setLog(false);
          setLoading('finish');
          pushNotis('failure');
        }
      } else {
          setLog(false);
          setLoading('internal');
          pushNotis('internal');
      }
    }
    getData();
  },[]);
  
  const pushNotis = (type, email) => {
    // debugger;
    if(ToastContext.pushNotification){
      switch(type){
        case 'success':
          let mail = email ? email.split('@')[0] : '';
          ToastContext.pushNotification({ msg:`hi ${mail}, you are successfully logged in.`, type:"success" });
          break;
        case 'success-logout':
          ToastContext.pushNotification({ msg:`hi , you are successfully logged out.`, type:"success" });
          break;
        case 'failure':
          ToastContext.pushNotification({ msg:`Please login.`, type:"warning" });
          break;
        case 'internal':
          ToastContext.pushNotification({ msg:`Internal Error..!`, type:"warning" });
          break;
        default:
          break;
      }
    }
  }
  // const setEmail = async
  const logoutUser = async () => {
    const response = await apis.logout();
    if( response.status === 200 ){
      setLog(false);
      pushNotis('success-logout');
      // setEmail()
    }
    return true;
  }

  const loginUser = async (email) => {
    setLog(true); 
    setEmail(email);
    pushNotis('success', email);
  }
  if (presentState === 'loading'){
    return <Loading />
  } else if(presentState === "internal"){
    return <div>Internal Error</div>
  }
  const MyContext = Context.MyContext;
  return (
    <div className="App">
      <MyContext.Provider value={{email:userEmail}}>
        <Router>
          <Switch>
            <ProtectedRoute  exact path="/"  component={HomePage} isLoggedIn = {isLoggedin} logoutUser={logoutUser}/>
            <ProtectedRoute exact path="/profile"  component={Profile} isLoggedIn = {isLoggedin} logoutUser={logoutUser}/>
            <Route exact path="/login" >
              <Login isLoggedIn = {isLoggedin} loginUser = {loginUser} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
       </MyContext.Provider>
       
    </div>
  );
}

class AppWrapper extends Component{
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.toastMessagesLength === this.props.length){
      return true;
    }
    return false;
  }

  render(){
    return (
      <>
        <App/>
      </>
    )
  }
}
class appContainer extends Component{
  state = {
    toastMessages:[]
  }
  notificationTimer = null;
  pushNotification = (notificatio = 'hii') =>{
    this.setState((prevStat)=>{
      // debugger;
      // console.log('nottii',notificatio);
      let prestMsgs = [...prevStat.toastMessages.slice()];
      if(notificatio && notificatio.msg){
        let notification = {...notificatio};
        notification.id = new Date().getTime();
        prestMsgs.push(notification);
      }else{
        prestMsgs.push({id: new Date().getTime(), msg:'hi '+prestMsgs.length, type:'success'});
      }
      this.popNotification();
      return {
        toastMessages: prestMsgs 
      }
    })
  }
  popNotification = () => {
    // debugger;
    clearTimeout(this.notificationTimer);
    this.notificationTimer = setTimeout(()=>{
      this.setState((prevStat)=>{
        let prestMsgs = [...prevStat.toastMessages.slice()];
        let openedNotifications = prestMsgs.filter(msg => new Date().getTime() - msg.id < 9500)
        return {
          toastMessages: openedNotifications 
        }
      })
    },10000)
  }
  render(){
    const ToastContext = Context.ToastContext;
    return (
      <ToastContext.Provider value={{ pushNotification: this.pushNotification}}>
        <AppWrapper toastMessagesLength={this.state.toastMessages.length}/>
        <ToastMessage notifications={this.state.toastMessages} pushNotificatio={this.pushNotification} popNotification = {this.popNotification} />
      </ToastContext.Provider>
    )
  }
}

export default appContainer;
