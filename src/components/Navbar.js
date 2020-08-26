import React, { Component, createRef } from 'react';
import { Spring, animated } from "react-spring/renderprops";
import logo from '../images/logo.jpg';
import LoadingElem from './LoadingElem';
import next from '../images/next.png';
import {
  Link
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
    const logoutResp = await this.props.logout();
    if(logoutResp){
      this.setState({
        logoutLoading: false
      });
    }
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
    // const { divHeight } = this.getHeight();
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
                          <div className="active">
                            <Link className="mylinks" to="/">Home</Link>
                          </div>
                          <div>
                            <Link className="mylinks" to="/profile">Profile</Link>
                          </div>
                          <div>
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
                  {/* <svg height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true" onClick={this.toggleMenu}>
                    <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"></path>
                  </svg> */}
                  <img onClick={this.toggleMenu} src={next} alt="arrow"/>
                </div>
              </div>
            </div>
        </nav>
      {/*
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark  bg-dark">
      <div className="navbar-brand dropdown">
        <div className="dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src={logo} width="40" alt="logo"/>
        </div> 
        <div>
          <p className="dropdown-item">Venkatashiva Avula</p>
          <p className="dropdown-item">Software Developer</p>
          <p className="dropdown-item">Active AI</p>
        </div>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="#">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#about">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#me">Contact</Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div style={{"marginLeft":"8px"}} className="logout-btn">
          <button onClick={this.logoutHandler} className="btn btn-outline-danger my-2 my-sm-0" type="submit"
          id={this.state.logoutLoading ? 'loading':''}
          disabled={this.state.logoutLoading ? ' disabled':''} >
            Logout
            <LoadingElem />
          </button>
        </div>
      </div>
    </nav>
    
      */}
    </>
    );
  }
}

export default Navbar;
