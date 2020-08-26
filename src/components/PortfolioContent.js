import React, { Component } from 'react';
import LoadingElement from './LoadingElem';
import EachStcok from './EachStack';
import PortfolioAnalysis from './PortfolioAnalysis';
import apis from './callApi';

class PortfolioContent extends Component{
    state = {
        name:'',
        stocks:[],
        currentPrices:{},
        loading:true,
        analysis: false
    }
    static getDerivedStateFromProps = (newProps,_oldProps) => {
        const { portfolioName,stockList } = newProps.portfolio;
        const values = Object.values(stockList);
        return { 
            name: portfolioName,
            stocks: values
         };
    }
    componentDidMount = async () => {
        const allSymbols = [];
        this.state.stocks.forEach( eachStock => {
            const  { Symbol } = eachStock.stock;
            allSymbols.push(Symbol);
        });
        const priceResp = await apis.callApi('/data/todayprices', 'POST', {symbols: allSymbols});
        if(priceResp.status) {
            const { symbols } = priceResp.result;
            const currentPrices = {};
            for(let symbol in symbols){
                currentPrices[symbol] = parseFloat(symbols[symbol]);
            }
            this.setState({
                currentPrices,
                loading:false
            })
        } else {
            this.setState({
                loading:false
            })
        }
        // setTimeout(()=>{
        //     this.setState({
        //         currentPrices:{
        //             'ICICIBANK': 386.35,
        //             'HDFCBANK': 1119.7,
        //             'VEDL': 130.05,
        //             'BHEL': 40.0,
        //             'ITC': 195.4,
        //             'BANDHANBNK': 293.4,
        //             'MAGMA': 35.3,
        //             'CUB': 131.1,
        //             'YESBANK': 14.75,
        //             'IDFCFIRSTB': 31.95
        //         },
        //         loading:false
        //     })
        // },1500)
    }
    openPortFolioAnalysis = (event)=>{
        this.setState(prevStat =>{
            return {
                analysis: !prevStat.analysis
            }
        })
    }
    render(){
        let investement = 0;
        let total  = 0;
        let isPositive = null,profitOrLoss, percentage='-';
        const { currentPrices } = this.state;
        const allStocks = this.state.stocks.map( (elem, index) => {
            const { allStocks, stock } = elem;
            const { 'Symbol': symbol } = stock;
            let stockNumber = 0;
            allStocks.forEach(element => {
                const { numberOfStocks, price } = element;
                investement += parseInt(numberOfStocks) * parseFloat(price);
                stockNumber += parseInt(numberOfStocks);
            });
            if(currentPrices[symbol]){
                total += stockNumber * parseFloat(currentPrices[symbol]);
            }
            // total += stockNumber 
            return (
                <EachStcok elem={elem} index={index} currentPrices={this.state.currentPrices} key={'stock-details'+index}/>
            )
        });
        if(total > 0){
            profitOrLoss = total - investement;
            isPositive = profitOrLoss >= 0 ? true : false;
            percentage = ( ( profitOrLoss / investement ) * 100 ).toFixed(2);
            profitOrLoss = profitOrLoss.toFixed(2);
        }
        return (
            <div className="each-portfolio" id={this.state.loading ? 'container-loading':''}>
                <div className="port-name">
                    <div className="portfolio-heading">
                        <p>{this.state.name}</p>
                    </div>
                    <div className="add-port">
                        <button 
                            // onClick 
                            type="button" 
                            className="btn btn-outline-primary"
                            disabled={this.state.analysis}
                        >Edit Portfolio</button>
                        <button 
                            onClick={this.openPortFolioAnalysis} 
                            type="button" 
                            className="btn btn-outline-primary"
                            disabled={this.state.analysis}
                        >Portfolio Analysis</button>
                    </div>
                </div>
                <div className="portfolio-stocks">
                    <div className="portfolio-stocks-heading">
                        <div>
                            <p>Stock Name</p>
                        </div>
                        <div>
                            <p>Quantity</p>
                        </div>
                        <div>
                            <p>Price (Avg ₹)</p>
                        </div>
                        <div>
                            <p>Current Price(₹)</p>
                        </div>
                        <div>
                            <p>Present Value(₹)</p>
                        </div>
                        <div>
                            <p>Profit / Loss(₹)</p>
                        </div>
                    </div>
                    {allStocks}
                    <div className="portfolio-each-stocks total-portfolio">
                        <div>
                            <p></p>
                        </div>
                        <div>
                            <p></p>
                        </div>
                        <div>
                            <p></p>
                        </div>
                        <div>
                            <p></p>
                        </div>
                        <div>
                            <p>₹ {total.toFixed(2)} ({investement.toFixed(2)})</p>
                        </div>
                        <div>
                            <p>
                                <span>{profitOrLoss === '-' ? profitOrLoss : isPositive === true ? '+'+profitOrLoss : profitOrLoss}</span>
                                <span style={{color:isPositive ===  null ? '' : isPositive ? '#0ba600':'#a60000'}}>{percentage === '-' ? "" : ' ('+percentage+'%)'}</span>
                            </p>
                        </div>
                    </div>
                </div>
                {this.state.analysis ?  <PortfolioAnalysis 
                    stocks = {this.state.stocks}
                    currentPrices = {this.state.currentPrices}
                    openPortFolioAnalysis = {this.openPortFolioAnalysis}
                />
                :
                null}
                {this.state.loading && <LoadingElement />}
            </div>
        )
    }
}

export default PortfolioContent;