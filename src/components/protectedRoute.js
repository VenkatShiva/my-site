import React  from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './Navbar';

function ProtectedRoute(props) {
  const { component: Component, isLoggedIn, logoutUser,  ...rest } = props;
  return (
    <Route {...rest} render={(_routeProps) => {
      return isLoggedIn === true ? 
      <>
      <Navbar logout={logoutUser} />
      <Component /> 
      </>
      : <Redirect to='/login' />
    }} />
  );
}

export default ProtectedRoute;
