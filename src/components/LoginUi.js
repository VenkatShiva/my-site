import React, { Component } from 'react';
import logo from '../images/logo.jpg';
import LoadingElem from './LoadingElem';
// import apis from './callApi';
class LoginUi extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      warning:'',
      isvalid: false,
      emailEntered: false
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    // this.checkEmail = this.checkEmail.bind(this);
  }
  handleEmailChange(event){
    const value = event.target.value;
    if(this.checkEmail(value)){
      this.setState({
        email: value.toLowerCase(),
        isvalid: true,
        warning: 'Valid'
      })
    }else{
      this.setState({
        email: value.toLowerCase(),
        isvalid: false,
        warning:''
      })
    }
  }
  submitEmail(event){
    event.preventDefault();
    this.setState({
      emailEntered: true,
      warning:''
    })
  }
  checkEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validateEmail(){
    const email = this.state.email;
    if(this.checkEmail(email)){
      this.setState({
        isvalid: true,
        warning: 'valid email',
      })
    }else{
      this.setState({
        isvalid: false,
        warning: 'invalid email'
      })
    }
  }
  async componentDidMount() {
    
  }
  render() {
    return (
      <div className="login center-mode">
        <div className="login-box">
            <div className="my-header">
                <img src={logo} alt="my-logo"/>
                <p>Venkatashiva Avula</p>
            </div>
            <div className="login-form">
                <p>Do you want to see my site? Then please enter your email.</p>
                <span className={this.state.warning ? this.state.isvalid ? 'email-valid fadeIn' : 'fadeIn' : 'fadeOut'}>{this.state.warning}</span>
                <input type="email" placeholder="Enter your email" 
                  value={this.state.email} 
                  onChange={this.handleEmailChange} 
                  onBlur={this.validateEmail}
                  disabled= { this.state.emailEntered ? 'disabled': ''} >
                  
                </input>
                <button className="btn btn-block my-2" type="submit" 
                  disabled={this.state.isvalid && !this.state.emailEntered ? '':'disabled'}
                  onClick={this.submitEmail}
                  id={this.state.emailEntered ? 'loading':''}>
                    Submit
                    <LoadingElem />
                </button>
            </div>
        </div>
      </div>
    );
  }
}
export default LoginUi;