import React, { Component } from 'react';
import LoadingElement from './LoadingElem';
import EachStcok from './EachStack';
import PortfolioAnalysis from './PortfolioAnalysis';
import EditPortfolio from './EditPortfolio/EditPortfolio';
import apis from './callApi';
import Context from '../contextProviders/emailProvider';

class PortfolioContent extends Component{
    static contextType = Context.MyContext;
    // static contextType = Context.ToastContext;
    // const value = useContext(Context.ToastContext);
    state = {
        name:'',
        stocks:[],
        currentPrices:{},
        loading:true,
        analysis: false,
        edit: false,
        editable: true
    }
    static getDerivedStateFromProps = (newProps,_oldProps) => {
        const { portfolioName,stockList } = newProps.portfolio;
        const { editable } = newProps;
        const values = Object.values(stockList);
        return { 
            name: portfolioName,
            stocks: values,
            editable
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
    openEditPortfolio = (event) => {
        this.setState(prevStat =>{
            return {
                edit: !prevStat.edit
            }
        })
    }
    render(){
        // console.log('portfolio render-->');
        let investement = 0;
        let total  = 0;
        let isPositive = null,profitOrLoss, percentage='-';
        const { currentPrices } = this.state;
        const { editable } = this.state;
        // console.log('toat ssss->',this.context);
        const { email: myEmail} = this.context;
        const disabled = editable ? false : myEmail === 'avenkatashiva@gmail.com' ? false:true;
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
                            className="btn img-btn"
                            title="Delete"
                            disabled={disabled}
                        >
                            <svg id="Layer_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z"/><path d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z"/></g></svg>
                        </button>
                        <button 
                            // onClick 
                            onClick={this.openEditPortfolio} 
                            type="button" 
                            className="btn img-btn"
                            title="Edit"
                            disabled={disabled}
                        >
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 460 460" style={{"enableBackground":"new 0 0 460 460"}} xml="preserve"><g><g><g><path d="M239.726,383.866l-47.513,12.205c-3.379,0.868-6.861,1.308-10.349,1.308c-11.111,0-21.558-4.327-29.415-12.184c-10.35-10.35-14.517-25.587-10.876-39.764l1.08-4.203h-40.247c-13.807,0-25-11.193-25-25s11.193-25,25-25h53.455c3.484-9.488,9.001-18.144,16.183-25.327l18.673-18.673h-88.311c-13.807,0-25-11.193-25-25s11.193-25,25-25h138.311l44.037-44.036c-0.444,0.023-0.89,0.036-1.339,0.036H102.407c-13.807,0-25-11.193-25-25c0-13.807,11.193-25,25-25h181.008c13.807,0,25,11.193,25,25c0,0.449-0.013,0.896-0.036,1.339l60.654-60.654c4.857-4.857,10.303-8.908,16.17-12.107v-28.46C385.203,12.691,372.511,0,356.856,0H28.966C13.311,0,0.62,12.691,0.62,28.346v403.307C0.62,447.309,13.311,460,28.966,460h327.89c15.655,0,28.346-12.691,28.346-28.346V252.142L271.744,365.6C262.905,374.44,251.833,380.756,239.726,383.866z"/><path d="M193.258,287.115c-5.047,5.047-8.646,11.356-10.422,18.269l-12.205,47.512c-1.02,3.972,0.133,8.187,3.032,11.087c2.203,2.203,5.164,3.397,8.202,3.397c0.961,0,1.93-0.12,2.885-0.365l47.512-12.205c6.913-1.776,13.222-5.375,18.269-10.422l161.327-161.327l-57.273-57.273L193.258,287.115z"/><path d="M447.519,90.127c-7.908-7.908-18.272-11.862-28.636-11.862c-10.364,0-20.729,3.954-28.636,11.862l-14.458,14.458l57.199,57.346l14.532-14.532C463.334,131.584,463.334,105.942,447.519,90.127z"/></g></g></g></svg>
                        </button>
                        <button 
                            onClick={this.openPortFolioAnalysis} 
                            type="button" 
                            className="btn img-btn"
                            disabled={this.state.analysis}
                            title="Analysis"
                        >
                            <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m76 240c12.101562 0 23.054688-4.855469 31.148438-12.652344l44.402343 22.199219c-.222656 1.808594-.550781 3.585937-.550781 5.453125 0 24.8125 20.1875 45 45 45s45-20.1875 45-45c0-6.925781-1.703125-13.410156-4.511719-19.277344l60.234375-60.234375c5.867188 2.808594 12.351563 4.511719 19.277344 4.511719 24.8125 0 45-20.1875 45-45 0-4.671875-.917969-9.089844-2.246094-13.328125l52.335938-39.242187c7.140625 4.769531 15.699218 7.570312 24.910156 7.570312 24.8125 0 45-20.1875 45-45s-20.1875-45-45-45-45 20.1875-45 45c0 4.671875.917969 9.089844 2.246094 13.328125l-52.335938 39.242187c-7.140625-4.769531-15.699218-7.570312-24.910156-7.570312-24.8125 0-45 20.1875-45 45 0 6.925781 1.703125 13.410156 4.511719 19.277344l-60.234375 60.234375c-5.867188-2.808594-12.351563-4.511719-19.277344-4.511719-12.101562 0-23.054688 4.855469-31.148438 12.652344l-44.402343-22.199219c.222656-1.808594.550781-3.585937.550781-5.453125 0-24.8125-20.1875-45-45-45s-45 20.1875-45 45 20.1875 45 45 45zm0 0"/><path d="m497 482h-16v-317c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v317h-30v-227c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v227h-30v-107c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v107h-30v-167c0-8.289062-6.710938-15-15-15h-60c-8.289062 0-15 6.710938-15 15v167h-16c-8.289062 0-15 6.710938-15 15s6.710938 15 15 15h482c8.289062 0 15-6.710938 15-15s-6.710938-15-15-15zm0 0"/></svg>
                            {/* <img src={analysis} alt='analyze-profile'/> */}
                        </button>
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
                    <div style={{maxHeight:'35vh', overflow:'auto'}}>
                        {allStocks}
                    </div>
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
                {this.state.edit ?  <EditPortfolio 
                    stocks = {this.state.stocks}
                    openEditPortfolio = {this.openEditPortfolio}
                />
                :
                null}

                {this.state.loading && <LoadingElement />}
            </div>
        )
    }
}

export default PortfolioContent;