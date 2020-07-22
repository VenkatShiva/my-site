import React,{ Component } from 'react';
import AddStock from './AddStock';
import LoadingElement from './LoadingElem';
import AddedStocks from './AddedStocks';
import apis from './callApi';

class AddPortfolio extends Component{
    state = {
        portfolioName: '',
        stocks:{},
        errMsg:'',
        loading:true,
        stockList:[
            {name: 'HDFC Bank', isin: '121089'},
            {name: 'IDFC First Bank', isin: '121090'},
            {name: 'ICICI Bank', isin: '121091'},
            {name: 'City Union Bank', isin: '121092'},
            {name: 'Vedanta Limited', isin: '121093'},         
        ]
    }
    onChangeHandler = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }
    onClancel = (event) =>{
        this.props.closePortfolio(event);
    }
    verifyPortfolio = () => {
        if(! this.state.portfolioName)
            return 'Please valid portfolio name';
        else if( Object.keys(this.state.stocks).length < 1){
            return 'Please add one stock atleast';
        }
        return true;
        // return this.state.portfolioName ? true : false;
    }
    setErrorMsg = (msg) => {
        this.setState({errMsg: msg});
        this.errTimeout && clearTimeout(this.errTimeout);
        this.errTimeout = setTimeout(()=>{
            this.setState({errMsg:''})
        },2000)
    }
    onSubmit = (event) => {
        const isValid = this.verifyPortfolio();
        if(isValid === true){
            const { savePortfolio } = this.props;
            const allStocks = { ...this.state.stocks };
            const { portfolioName }= this.state;
            savePortfolio({portfolioName, allStocks})
            // this.setErrorMsg('Enter valid Portfoio name.')
        } else {
            this.setErrorMsg(isValid);
        }
    }
    addStock = (stock) => {
        this.setState(prevState => {
            const { Symbol: symbol } = stock.stock;
            const stocksAdded =  JSON.parse(JSON.stringify(prevState.stocks));
            if(stocksAdded[symbol]){
                const { allStocks } = stock; 
                stocksAdded[symbol]['allStocks'] = stocksAdded[symbol]['allStocks'].concat(allStocks);
                return {
                    stocks: {...stocksAdded}
                }

            }else{
                stocksAdded[symbol] = Object.assign({},stock);
                return {
                    stocks: {...stocksAdded}
                }
            }
        })
    }
    deleteStock = (details) => {
        const {symbol,index}= details;
        const stocksAdded =  JSON.parse(JSON.stringify(this.state.stocks));
        // const stocksAdded = this.state.stocks.slice();
        stocksAdded[symbol]['allStocks'].splice(index,1);
        if(stocksAdded[symbol]['allStocks'].length <= 0){
            delete stocksAdded[symbol];
        }
        this.setState({
            stocks:stocksAdded
        })
    }
    componentDidMount = async () => {
        const stockResp = await apis.callApi('/data');
        // console.log(stockResp);
        if(stockResp.status) {
            const { stocks } = stockResp.result;
            // console.log(stocks); stockList
            this.setState({
                stockList: stocks,
                loading:false
            })
        } else {
            this.setState({
                loading:false
            })
        }
    }
    render(){
        // debugger;
        let addedStocks;
        if(Object.keys(this.state.stocks).length>0){
            addedStocks = (<AddedStocks 
                addedStocks={this.state.stocks} 
                deleteStock = {this.deleteStock}
            />)
        }else{
            addedStocks = null;
        }
        return (
            <div className="add-portfolio" id={this.state.loading ? 'container-loading':''}>
                <div className="portfolio-name">
                    <div className="name-heading">
                        <p>Enter Portfolio Name</p>
                        <input 
                            type="text" 
                            autoComplete="off"
                            placeholder="Enter portfolio"
                            onChange = {this.onChangeHandler}
                            value={this.state.portfolioName}
                            name="portfolioName"
                        />
                    </div>
                    {addedStocks}
                    <AddStock stockList={this.state.stockList} addStock={this.addStock}/>
                    {this.state.errMsg && <p className="err-msg">{this.state.errMsg}</p>}
                    <div className="my-btn-container">
                        <button 
                            onClick={this.onClancel}
                            type="button"
                            className="btn btn-outline-warning"
                            >
                                Cancel Portfolio
                        </button>
                        <button 
                            onClick={this.onSubmit}
                            type="button" 
                            className="btn btn-outline-success"
                            >
                                Submit Portfolio
                        </button>
                    </div>
                </div>
                {this.state.loading && <LoadingElement />}
            </div>
        )
    }
}
export default AddPortfolio;