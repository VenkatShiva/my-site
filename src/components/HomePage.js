import React, { Component } from 'react';
import Carousal  from './Carousal';
import Portfolio from './Portfolio';
import BasicTransaction from './BasicTransition';

class HomePage extends Component {
  render() {
    return (
      <BasicTransaction>
          {/* <Navbar logout={logout}/> */}
          <Carousal/>
          <Portfolio />
      </BasicTransaction>
    )
  }
}

export default HomePage;