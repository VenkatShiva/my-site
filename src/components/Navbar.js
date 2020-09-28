import React, { Component, createRef } from 'react';
import { Spring, animated } from "react-spring/renderprops";
import logo from '../images/logo.jpg';
import LoadingElem from './LoadingElem';
import next from '../images/next.png';
import {
  Link
} from "react-router-dom";
import {
  withRouter
} from "react-router-dom";
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      logoutLoading: false,
      opened: false,
      divHeight: 0,
      mobile: false,
      loaded: false,
    };
    this.logoutHandler = this.logoutHandler.bind(this);
  }
  toggleMenuRef = createRef()
  async logoutHandler(){
    this.setState({
      logoutLoading: true
    });
    await this.props.logout();
    this.setState({
      logoutLoading: false
    });
  }
  getHeight = () => {
    let toggleheight, divHeight;
    try{
      if(this.toggleMenuRef){
        toggleheight = this.toggleMenuRef.current.offsetHeight;
        divHeight = this.toggleMenuRef.current.scrollHeight;
      }
    }catch(err){
      console.log(err);
    }
    return { toggleheight, divHeight: divHeight ? divHeight : 75 };
  }
  toggleMenu = (_event) => {
    // const { divHeight } = this.getHeight();
    // debugger;
    const { innerWidth: width } = window;
    const { mobile } = this.state;
    const { divHeight } = this.getHeight();
    if(!mobile && width <= 480){
      this.setState({
        mobile: true,
        opened: false,
        divHeight
      })
    } else {
      this.setState(prev => {
        return {
          opened: !prev.opened,
          divHeight
        }
      });
    }
  }
  componentDidMount = () => {
    const { innerWidth: width } = window;
    const { divHeight } = this.getHeight();
    let open = true, mobile = false;
    if(width <= 480){
      open = false;
      mobile = true
    }
    this.setState({
      opened: open,
      divHeight,
      mobile,
      loaded: true
    })
  }
  render() {
    const { mobile, opened, divHeight } = this.state;
    let from = {opacity: 1}, enter= {opacity: 1};
    if(mobile){
      if(opened){
        from = {  opacity: 0, height: 0 };
        enter = {  opacity: 1, height: divHeight };
      }else{
        from = {  opacity: 1, height: divHeight };
        enter = {  opacity: 0, height: 0 };
      }
    }
    const { path } = this.props.match;
    let currentPage = 'home';
    if(path.indexOf('profile') > -1){
      currentPage = 'profile';
    } else if(path.indexOf('contact') > -1){
      currentPage = 'contact';
    }
    return (
      <>
        <nav className="sticky-navbar">
            <div className="logo-container">
              <div className="logo-div">
                <button className="btn center">
                  <img src={logo} width="40" alt="logo"/>
                  <div className="mydropdown" >
                  <p className="drop-item">Venkatashiva Avula</p>
                  <p className="drop-item">Software Developer</p>
                  <p className="drop-item">Active AI</p>
                </div>
                </button>
              </div>
              <Spring
                native
                // items= { this.state.opened }
                from= { from }
                to= { enter }
                // leave= { leave }
              >
                {
                  // show =>
                    // show &&
                    (props => (
                      <animated.div 
                        style={ props }
                        className="leftside-navs"
                        >
                          <div 
                            className = { currentPage === 'home' ? 'active': '' }
                            >
                            <Link className="mylinks" to="/">Home</Link>
                          </div>
                          <div
                            className = { currentPage === 'profile' ? 'active': '' }
                          >
                            <Link className="mylinks" to="/profile">Profile</Link>
                          </div>
                          <div
                            className = { currentPage === 'contact' ? 'active': '' }
                          >
                            <Link className="mylinks" to="/contact">Contact</Link>
                          </div>
                      </animated.div>
                    ))
                }
              </Spring>
              <div 
                className="leftside-navs"
                ref={this.toggleMenuRef}
                style={
                  { 
                    visibility: 'hidden',
                    position:'absolute',
                    display: this.state.loaded ? 'none' : ''
                  }
                }
                >
                  <div className="active">
                    <Link className="mylinks" to="/">Home</Link>
                  </div>
                  <div>
                    <Link className="mylinks" to="/profile">Profile</Link>
                  </div>
                  <div>
                    <Link className="mylinks" to="/contact">Contact</Link>
                  </div>
              </div>
            </div>
            <div className="navigators">
              <div className="rightside-navs">
                <div style={{"marginLeft":"8px"}} className="logout-btn">
                  <button onClick={this.logoutHandler} className="btn btn-outline-danger" type="submit"
                    id={this.state.logoutLoading ? 'loading':''}
                    disabled={this.state.logoutLoading ? ' disabled':''} >
                      Logout
                    <LoadingElem />
                  </button>
                </div>
                <div className="menu-bar" id={this.state.opened ? 'toggle-drop': ''}>
                  <img onClick={this.toggleMenu} src={next} alt="arrow"/>
                </div>
              </div>
            </div>
        </nav>
    </>
    );
  }
}

export default withRouter(Navbar);
