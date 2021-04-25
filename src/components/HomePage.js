import React, { Component } from 'react';
import Portfolio from './Portfolio';
import BasicTransaction from './BasicTransition';
import FinancialLiteracy from './Interests/FinancialLiteracy'

class HomePage extends Component {
  render() {
    return (
      <BasicTransaction>
          {/* <Navbar logout={logout}/> */}
          {/* <Carousal/> */}
          <FinancialLiteracy />
          <Portfolio />
      </BasicTransaction>
    )
  }
}

export default HomePage;