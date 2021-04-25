import React, { Component } from 'react';
import logo from '../images/logo.jpg';
import LoadingElem from './LoadingElem';
import apis from './callApi';
// import apis from './callApi';
class LoginUi extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      warning:'',
      isvalid: false,
      emailEntered: false,
      otpEntered: false,
      otpShow: false,
      otp: Array(6).fill(''),
      otpLoading: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.otpRefs = Array(6).fill(null);
    this.OTPSubmit = this.OTPSubmit.bind(this);
    // this.checkEmail = this.checkEmail.bind(this); http://192.168.43.223:3000
  }
  async OTPSubmit(event){
    event.preventDefault();
    this.setState({
      otpLoading: true
    });
    try{
      const sendOtp = await apis.callApi('/auth/verify','POST', {email:this.state.email,otp: this.state.otp.join('')});
      if(sendOtp.status ===  true){
        if(sendOtp && sendOtp.result.result === true){
          // this.setState({
          //   redirect:'/'
          // })
          const { loginUser } = this.props;
          loginUser(this.state.email);
        }else if(sendOtp && sendOtp.result){
          let warning = '';
          switch(sendOtp.result.reason){
            case 'wrong': 
              warning = 'Wrong OTP, try again';
              break;
            case 'noemail':
              warning = 'Check email once';
              break;
            case 'internal':
              warning = 'Internal error try again after some time'
              break;
            default: warning = ''
          }
          this.setState({
            otpWarning: warning,
            otpLoading: false
          })
        }
      }else{
        this.setState({
          otpWarning:'Something went wrong, please try again',
          otpLoading: false
        })
      }
    }catch(err){
      console.log(err);
    }
    // console.log(sendOtp);
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
  async submitEmail(event){
    event.preventDefault();
    this.setState({
      emailEntered: true,
      warning:''
    });
    // let thisIs = this;
    const regEmail = await apis.callApi('/auth','POST', {email:this.state.email});
    if(regEmail.status ===  true){
      if(regEmail.result && regEmail.result.result){
        if(regEmail.result.result === 'yes'){
          // this.setState({
          //   redirect:'/'
          // })
          const { loginUser } = this.props;
          loginUser(this.state.email);
        }else if(regEmail.result.result === 'no'){
          if(regEmail.result.sent === true){
            let warning = '';
            if(regEmail.result.status === 'update'){
              warning = 'You already tried with this email, but not verified';
            }
            this.setState({
              otpShow: true,
              otpWarning:warning
            })
          }else{
            this.setState({
              warning: 'Internal error please try again later',
              emailEntered: false
            })
          }
        }
      }
      // console.log(regEmail);
    }else{
      this.setState({
        warning:'Something went wrong, please try again',
        emailEntered: false,
      })
    }
    // setTimeout(function(){
    //   thisIs.setState({
    //     otpShow: true
    //   })
    // },1000)
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
  validateNumber(event){
    const value = event.target.value;
    if(/^\d$/.test(value)){
      return true
    }
    return false
  }
  async componentDidMount() {
    
  }
  render() {
    const otpReference = Array(6).fill(null);
    return (
      <div className="login center-mode">
        <div className="login-box">
            <div className="my-header">
                <img src={logo} alt="my-logo"/>
                <p>Venkatashiva Avula</p>
            </div>
            <div className="login-form">
              <form>
                <p>Do you want to see my site? Then please enter your email.</p>
                <span className={this.state.warning ? this.state.isvalid ? 'email-valid fadeIn' : 'fadeIn' : 'fadeOut'}>{this.state.warning}</span>
                <input type="email" placeholder="Enter your email" 
                  value={this.state.email} 
                  onChange={this.handleEmailChange} 
                  autoComplete="off"
                  onBlur={this.validateEmail}
                  disabled= { this.state.emailEntered ? 'disabled': ''} >
                </input>
                <button className="btn" type="submit" 
                  disabled={this.state.isvalid && !this.state.emailEntered ? '':'disabled'}
                  onClick={this.submitEmail}
                  style={{display: this.state.otpShow ? 'none':'block'}}
                  id={this.state.emailEntered ? 'loading':''}>
                    Submit
                    <LoadingElem />
                </button>
              </form>
            </div>
            { this.state.otpShow ?  <div className="login-form otpp">
                <p>I sent you an OTP to your mail, please enter here</p>
                <span className={this.state.otpWarning ? this.state.isvalid ? 'email-valid fadeIn' : 'fadeIn' : 'fadeOut'}>{this.state.otpWarning}</span>
                <form>
                <div className="otp-container">
                  {
                  otpReference.map((otp,index)=>{
                    return(<input
                      maxLength={1}
                      autoComplete="off"
                      key={"input"+index}
                      onChange={(event)=>{
                        const value = event.target.value;
                        if(/^\d$/.test(value) || value === ''){
                          const currentOtps = this.state.otp.slice();
                          currentOtps[index] = value;
                          const otpEntered = verifyOtp(currentOtps);
                          this.setState({otp:currentOtps, otpEntered},()=>{
                            // this.otpRefs[index].blur();
                            if(value === ''){
                              if(index>0)
                                this.otpRefs[index-1].focus();
                            }
                            else if(index<5){
                              this.otpRefs[index+1].focus();
                            }
                          })
                        }
                        function verifyOtp(otps){
                          const otp = otps.join('');
                          if(/^\d{6}$/.test(otp)){
                            return true;
                          }
                          return false;
                        }
                      }}
                      type="password"
                      // onFocus={(event)=>{
                      //   event.target.select();
                      // }}
                      value={this.state.otp[index]}
                      inputMode="decimal"
                      disabled={this.state.otpLoading ? true:false}
                      onKeyUp={
                        event=>{
                          if( !this.state.otp[index] && event.keyCode === 8){
                            if(index>0){
                              this.otpRefs[index].blur();
                              this.otpRefs[index-1].focus();
                            }
                          }
                        }
                      }
                      ref={ref => {
                          this.otpRefs[index] = ref;
                        }
                      }
                    ></input>)
                  
                  })
                }
                </div>
                <button className="btn" type="submit" 
                  disabled={this.state.otpEntered ? this.state.otpLoading ? 'disabled':'':'disabled'}
                  onClick={this.OTPSubmit}
                  id={this.state.otpLoading ? 'loading':''}
                  >
                    Submit
                    <LoadingElem />
                </button>
                </form>
            </div> : null}
        </div>
      </div>
    );
  }
}
export default LoginUi;