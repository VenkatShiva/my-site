import React, { Component } from 'react';
import Loading from './Loading';
import Navbar from './Navbar';
import Carousal  from './Carousal';
import apis from './callApi';
import {
    Redirect,
    withRouter
} from "react-router-dom";
class ProtectedRoute extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false,
      internalError: false
    };
  }
  async componentDidMount() {
    if(this.props.location && this.props.location.isRedirected){
      this.setState({
        loading: false,
        redirect: false
      });
    }else{
      const response = await apis.isLoggedIn();
      if( response.status === 200 ){
        if(response.login){
          this.setState({
            loading: false,
            redirect: false
          });
        }else{
          this.setState({
            loading: false,
            redirect: true
          });
        }
      }else{
        this.setState({
          loading: false,
          internalError: true
        })
      }
    }
  }
  render() {
    const { loading, redirect, internalError } = this.state;
    if(loading){
      return <Loading />
    }
    if(internalError){
      return <div>Internal Error</div>
    }
    if(redirect){
      return <Redirect to={{
        pathname: '/login',
        isRedirected : true
      }} />;
    }
    return (
      <div>
        <Navbar/>
        <Carousal/>
      </div>
    );
  }
}

export default withRouter(ProtectedRoute);