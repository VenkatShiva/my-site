import React, { Component } from 'react';
import apis from './callApi';
import Loading from './Loading';
import LoginUi from './LoginUi'
import {
    Redirect,
    withRouter
} from "react-router-dom";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false,
      internalError: false,
    };
  }
  async componentDidMount() {
    if(this.props.location && this.props.location.isRedirected){
      this.setState({
        loading: false,
        redirect: false,
      });
    }else{
      const response = await apis.isLoggedIn();
      if( response.status === 200 ){
        if(response.login){
          this.setState({
            loading: false,
            redirect: true
          })
        }else{
          this.setState({
            loading: false,
            redirect: false
          })
        }
      }else{
        this.setState({
          loading: false,
          internalError: true
        })
      }
    }
    // console.log(response);
  }
  render() {
    const { loading, redirect, internalError } = this.state;
    // const location = useLocation();
    if(loading){
      return <Loading />
    }
    if(internalError){
      return <div>Internal Error</div>
    }
    if(redirect){
      return <Redirect to={{
        pathname: '/',
        isRedirected : true
      }} />;
    }
    return <LoginUi/>;
  }
}
export default withRouter(Login);