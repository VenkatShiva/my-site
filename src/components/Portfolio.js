import React,{ Component } from 'react';
import AddPortfolio from './AddPortfolio';
import PortfolioComponent from './PortfolioComponent';
class Portfolio extends Component{
    constructor(){
        super();
        this.state = {
            portfolios:[
                {
                    "portfolioName": "ShivajiTheBoss",
                    "allStocks": {
                      "ICICIBANK": {
                        "stock": {
                          "_id": "5f0ff6025754584bc8ac7c4a",
                          "Company Name": "ICICI Bank Ltd.",
                          "Industry": "FINANCIAL SERVICES",
                          "Symbol": "ICICIBANK",
                          "Series": "EQ",
                          "ISIN Code": "INE090A01021",
                          "__v": 0
                        },
                        "allStocks": [
                          {
                            "numberOfStocks": "10",
                            "price": "360",
                            "stockDate": "2020-07-21"
                          },
                          {
                            "numberOfStocks": "10",
                            "price": "380", 
                            "stockDate": "2020-07-14"
                         }
                        ]
                      },
                      "HDFCBANK": {
                        "stock": {
                          "_id": "5f0ff6025754584bc8ac7c35",
                          "Company Name": "HDFC Bank Ltd.",
                          "Industry": "FINANCIAL SERVICES",
                          "Symbol": "HDFCBANK",
                          "Series": "EQ",
                          "ISIN Code": "INE040A01034",
                          "__v": 0
                        },
                        "allStocks": [
                          {
                            "numberOfStocks": "10",
                            "price": "1200",
                            "stockDate": "2020-07-21"
                          }
                        ]
                      }
                    }
                  }
            ],
            addPortfolio: false
        }
    }
    savePortfolio = (portfolio) => {
        this.setState(prevState => {
            const allPortfolios = prevState.portfolios.slice();
            allPortfolios.push(portfolio)
            return {
                portfolios: allPortfolios,
                addPortfolio: false
            }
        })
    }
    addPortfolio = (event) => {
        if(!this.state.addPortfolio){
            this.setState({addPortfolio: true})
        }
    }
    closePortfolio = (event) => {
        this.setState({addPortfolio: false}) 
    }
    render(){
        return (
            <div className="portfolio-container">
                <div className="add-portfolio-container">
                    <div className="my-choice">
                        <p>I interested in Investing in Stocks, So I created my portfolio here.</p>
                        <p>Try to add your portfolio by clicking <span style={{color:"#007bff"}}>Add Portfolio</span> .</p>
                    </div>
                    <div className="port-heading">
                        <div>
                            <p>Check my Portfolio here</p>
                        </div>
                        <div className="add-port">
                            <button 
                                onClick={this.addPortfolio} 
                                type="button" 
                                className="btn btn-outline-primary"
                                disabled={this.state.addPortfolio}
                            >Add Portfolio</button>
                        </div>
                    </div>
                </div>
                <PortfolioComponent allPortfolios={this.state.portfolios}/>
                { this.state.addPortfolio && <AddPortfolio closePortfolio={this.closePortfolio} savePortfolio={this.savePortfolio}/>}
            </div>
        )
    }
}

export default Portfolio;