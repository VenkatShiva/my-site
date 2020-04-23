import React from 'react';
import logo from '../images/logo.jpg'
function Navbar() {
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
          <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#about">Profile</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#me">Contact</a>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
</nav>
  );
}

export default Navbar;
