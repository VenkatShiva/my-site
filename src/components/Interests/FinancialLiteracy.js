import React, { Component } from 'react';
import financial from '../../images/financial-leteracy.svg'

class FinancialLiteracy extends Component {
  render() {
    return (
       <div className="fin-literacy">
           <p className="fin-title">Financial Literacy</p>
           <div>
               <div className="fin-lit-header">
                    <div className="fin-img">
                        <img src={financial} alt="financial-literacy"/>
                    </div>
                    <div className="fin-quet">
                        <p> What is financial literacy ?</p>
                    </div>
               </div>
               <div>
                   <p>
                   Financial literacy is the ability to understand how to make sound financial choices so you can confidently manage and grow your money.
                   </p>
                   <ul>
                       
                   </ul>
               </div>
           </div>
           hello
       </div>
    );
  }
}

export default FinancialLiteracy;