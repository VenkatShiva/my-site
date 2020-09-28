import React from 'react';

import LoginUi from './LoginUi';
import {
    Redirect,
} from "react-router-dom";
function ProtectedRoute(props) {
  const { isLoggedIn, loginUser } = props;
  if(isLoggedIn){
    return <Redirect to='/' />;
  }
  return (
    <LoginUi loginUser={loginUser} />
  )
}

export default ProtectedRoute;