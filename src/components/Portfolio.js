import React,{ Component } from 'react';
import AddPortfolio from './AddPortfolio';
import PortfolioComponent from './PortfolioComponent';
import apis from './callApi';

class Portfolio extends Component{
    constructor(){
        super();
        this.state = {
            portfolios:[
                // {
                //     "portfolioName": "Shiva'sPortfolio",
                //     "stockList": {
                //       "ICICIBANK": {
                //         "stock": {
                //           "_id": "5f0ff6025754584bc8ac7c4a",
                //           "Company Name": "ICICI Bank Ltd.",
                //           "Industry": "FINANCIAL SERVICES",
                //           "Symbol": "ICICIBANK",
                //           "Series": "EQ",
                //           "ISIN Code": "INE090A01021",
                //           "__v": 0
                //         },
                //         "allStocks": [
                //           {
                //             "numberOfStocks": "3",
                //             "price": "353",
                //             "stockDate": "2020-07-21"
                //           },
                //           {
                //             "numberOfStocks": "3",
                //             "price": "343", 
                //             "stockDate": "2020-07-14"
                //          }
                //         ]
                //       },
                //       "HDFCBANK": {
                //         "stock": {
                //           "_id": "5f0ff6025754584bc8ac7c35",
                //           "Company Name": "HDFC Bank Ltd.",
                //           "Industry": "FINANCIAL SERVICES",
                //           "Symbol": "HDFCBANK",
                //           "Series": "EQ",
                //           "ISIN Code": "INE040A01034",
                //           "__v": 0
                //         },
                //         "allStocks": [
                //           {
                //             "numberOfStocks": "1",
                //             "price": "1084.33",
                //             "stockDate": "2020-07-21"
                //           }
                //         ]
                //       },
                //       "VEDL": {
                //         "stock": {
                //           "_id": "5f0ff6025754584bc8ac7c35",
                //           "Company Name": "Vedanta Ltd.",
                //           "Industry": "METALS",
                //           "Symbol": "VEDL",
                //           "Series": "EQ",
                //           "ISIN Code": "INE205A01025",
                //           "__v": 0
                //         },
                //         "allStocks": [
                //           {
                //             "numberOfStocks": "16",
                //             "price": "62.75",
                //             "stockDate": "2020-07-21"
                //           }
                //         ]
                //       },
                //       "BHEL": {
                //         "stock": {
                //           "_id": "5f0ff6025754584bc8ac7c35",
                //           "Company Name": "Bharat Heavy Electricals Ltd.",
                //           "Industry": "INDUSTRIAL MANUFACTURING",
                //           "Symbol": "BHEL",
                //           "Series": "EQ",
                //           "ISIN Code": "INE257A01026",
                //           "__v": 0
                //         },
                //         "allStocks": [
                //           {
                //             "numberOfStocks": "23",
                //             "price": "22.39",
                //             "stockDate": "2020-07-21"
                //           }
                //         ]
                //       },
                //     }
                //   },
            ],
            addPortfolio: false
        }
    }
    savePortfolio = (portfolio) => {
        this.setState(prevState => {
            const allPortfolios = prevState.portfolios.slice();
            allPortfolios.push(portfolio);
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
    componentDidMount = async () => {
      const stockResp = await apis.callApi('/data/portfolios');
        // debugger;
        // console.log(stockResp);
        if(stockResp.status) {
            const { portfolios } = stockResp.result;
            // console.log(stocks); stockList
            this.setState({
                portfolios: portfolios,
                loading:false
            })
        } else {
            this.setState({
                loading:false
            })
        }
    }
    render(){
        return (
            <div className="portfolio-container">
                <div className="add-portfolio-container">
                    <div className="my-choice">
                        <p>I interested in Investing in Stocks, So I created portfolio(s) here.</p>
                        <p>Try to add your portfolio by clicking <span style={{color:"#007bff"}}>Add Portfolio</span> .</p>
                    </div>
                    <div className="port-heading">
                        <div>
                            <p>Check my Portfolio below</p>
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