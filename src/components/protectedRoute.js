import React, { Component } from 'react';
import Loading from './Loading';
import Navbar from './Navbar';
import Carousal  from './Carousal';
import Portfolio from './Portfolio';
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
      internalError: false,
    };
    this.logout = this.logout.bind(this);
  }
  async logout() {
    const response = await apis.logout();
    if( response.status === 200 ){
      this.setState({
        redirect: true,
      });
    }else{
      // this.setState({
      //   internalError: true
      // })
    }
    return true;
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
        isRedirected : true,
      }} />;
    }
    return (
      <div>
        <Navbar logout={this.logout}/>
        <Carousal/>
        <Portfolio />
      </div>
    );
  }
}

export default withRouter(ProtectedRoute);