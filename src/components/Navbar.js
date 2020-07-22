import React, { Component } from 'react';
import logo from '../images/logo.jpg';
import LoadingElem from './LoadingElem';
import {
  Link
} from "react-router-dom";
class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      logoutLoading: false
    };
    this.logoutHandler = this.logoutHandler.bind(this);
  }
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
  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark  bg-dark">
      <div className="navbar-brand dropdown">
        <div className="dropdown-toggle"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src={logo} width="35" alt="logo"/>
        </div> 
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
    );
  }
}

export default Navbar;
