import React,{ Component } from 'react';
import AddPortfolio from './AddPortfolio';
import PortfolioComponent from './PortfolioComponent';
import Context from '../contextProviders/emailProvider';
import apis from './callApi';

class Portfolio extends Component{
    static contextType = Context.ToastContext;
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
            addPortfolio: false,
            loading: true,
            myportfolio:[]
        }
    }
    deletePortfolio = (name, email) => {
        this.setState(prevState => {
            let portfolioIndex, allPortfolios;
            if(email === 'avenkatashiva@gmail.com'){
                portfolioIndex = prevState.myportfolio.findIndex( portfolio => portfolio.portfolioName === name);
                allPortfolios = prevState.myportfolio.slice();
                if(portfolioIndex > -1){
                    allPortfolios.splice(portfolioIndex,1);
                }
                return {
                    myportfolio: allPortfolios
                }
            } else {
                portfolioIndex = prevState.portfolios.findIndex( portfolio => portfolio.portfolioName === name);
                allPortfolios = prevState.portfolios.slice();
                if(portfolioIndex > -1){
                    allPortfolios.splice(portfolioIndex,1);
                }
                return {
                    portfolios: allPortfolios
                }
            }
        });
        if(this.context.pushNotification){
            this.context.pushNotification({ msg:`Portfolio deleted successfully..`, type:"success" })
        }
    }
    savePortfolio = (portfolio, email) => {
        // debugger;
        let allPortfolios;
        this.setState(prevState => {
            if(email === 'avenkatashiva@gmail.com'){
                allPortfolios = prevState.myportfolio.slice();
                allPortfolios.push(portfolio);
                return {
                    myportfolio: allPortfolios,
                    addPortfolio: false
                }
            } else {
                allPortfolios = prevState.portfolios.slice();
                allPortfolios.push(portfolio);
                return {
                    portfolios: allPortfolios,
                    addPortfolio: false
                }
            }
        });
        if(this.context.pushNotification){
            this.context.pushNotification({ msg:`Portfolio added successfully..`, type:"success" })
        }
    }
    isNameExist = (name) => {
        const portfolioIndex = this.state.portfolios.findIndex( portfolio => portfolio.portfolioName === name);
        if(portfolioIndex > -1){
            return true;
        }
        return false;
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
            const { portfolios, myportfolio } = stockResp.result;
            // console.log(stocks); stockList
            this.setState({
                portfolios: portfolios,
                myportfolio,
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
                <PortfolioComponent loading={this.state.loading} deletePortfolio = {this.deletePortfolio}  allPortfolios={this.state.portfolios} myportfolio={this.state.myportfolio} />
                { this.state.addPortfolio && <AddPortfolio closePortfolio={this.closePortfolio} savePortfolio={this.savePortfolio} isNameExist = {this.isNameExist}/>}
            </div>
        )
    }
}

export default Portfolio;