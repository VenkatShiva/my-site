import React, { Component } from 'react';
import MyDropdown from './MyDowpdown';

class AddStock extends Component {
    state = {
        stockName:'',
        numberOfStocks:'',
        price:'',
        stockDate: new Date().toISOString().slice(0,10),
        selectedList:[],
        errMsg:'',
        symbol:'',
        keySelect: 0
    }
    onChangeHandler = (event) => {
        let { value, name } = event.target;
        if(name === 'numberOfStocks' && value){
            value = value.replace(/[^\d]+/g,'');
            // value = parseInt(value);
            if(parseInt(value)<1){
                value = 1
            }
        }
        if(name === 'price' && value){
            // debugger;
            value = value.replace(/[^0-9.]/g,'')
            value = value.replace(/(\d*.)(.*)/, '$1') + value.replace(/(\d*.)(.*)/, '$2').replace(/\./g,'');
            // value = parseFloat(value);
            // value = parseFloat(value);
        }
        this.setState({ [name]: value });
    }
    performStockSearch = (event)=>{
        const { stockList } = this.props;
        const { value } = event.target;
        if(value){
            let selectedList = []; 
            stockList.map( (elem, _index ) => {
                const {'Company Name': companyName, 'Symbol': symol } =  elem;
                if( (companyName && companyName.toLowerCase().indexOf(value.toLowerCase()) > -1 ) || ( symol && symol.toLowerCase().indexOf(value.toLowerCase()) > -1) ){
                    selectedList.push({...elem});
                }
                return null;
            })
            this.setState({
                selectedList
            })
        }else{
            this.setState({
                selectedList:[]
            })
        }
    }
    onChangeOfStockName = () => {
        let debounceTimer;
        // let callback = performStockSearch;
        return (event) => {
            const { value, name } = event.target;
            this.setState({
                [name]:value,
                keySelect:0
            });
            event.persist();
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(()=>{
                // debugger;
                this.performStockSearch(event);
            },500);
        }
    }
    onStockClick = (details) => {
        const {name,symbol} = details;
        this.setState({
            stockName: name,
            symbol,
            selectedList: []
        })
    }
    getStockFromSymbol = () => {
        const { symbol } = this.state;
        const { stockList } = this.props;
        let stock;
        for(let i=0;i<stockList.length;i++){
            let { 'Symbol': stockSymbol } = stockList[i];
            if( symbol === stockSymbol ){
                stock = {...stockList[i]}
                break;
            }
        }
        return stock;
    }
    submitStock = (_event) => {
        const stock = this.getStockFromSymbol();
        const { numberOfStocks, price, stockDate } = this.state;
        let errMsg = '';
        if(!stock){
            errMsg = 'Select valid stock';
        } else if( !parseInt(numberOfStocks)) {
            errMsg = 'Enter valid number of stocks';
        } else if( !parseFloat(price) ) {
            errMsg = 'Enter valid stock price';
        }
        if(errMsg){
            this.setState({
                errMsg
            })
        } else {
            this.props.addStock({ stock, allStocks:[{ numberOfStocks, price, stockDate }] });
            this.setState({
                stockName:'',
                numberOfStocks:'',
                price:'',
                stockDate: new Date().toISOString().slice(0,10),
                selectedList:[],
                errMsg:''
            })
        }
    }
    onStockBlur = (_event) => {
        setTimeout(()=>{
            const { selectedList } = this.state;
            if(selectedList.length > 0){
                this.setState({
                    selectedList:[]
                })
            }
        },10)
    }
    onFocusOfInput = (_event) => {
        this.setState({
            errMsg:''
        })
    }
    selectCompany = (event) => {
        const { keyCode } = event;
        const { keySelect, selectedList } = this.state;
        switch(keyCode){
            case 38:
                event.preventDefault();
                if(selectedList.length > 0 && keySelect > 1){
                    this.setState({ keySelect: keySelect-1})
                }
                break
            case 40:
                if(selectedList.length > 0 && keySelect < selectedList.length){
                    this.setState({ keySelect: keySelect+1})
                }
                break;
            case 13:
                if(keySelect > 0){
                    const stockDetails = selectedList[keySelect-1];
                    this.onStockClick({symbol:stockDetails['Symbol'],name:stockDetails['Company Name']})
                }
                break
            default: return;
        }
    }
    render(){
        return (
            <div className="add-stock">
                <div className="field-rows">
                    <div className="stock-search">
                        <p>Enter Stock Name</p>
                        <input 
                            type="text" 
                            autoComplete="off"
                            placeholder="Search Stock"
                            onChange = {this.onChangeOfStockName()}
                            onBlur = {this.onStockBlur}
                            onFocus = {this.onFocusOfInput}
                            value = {this.state.stockName}
                            onKeyDown = {this.selectCompany}
                            name="stockName"
                        />
                        <MyDropdown selectedList={this.state.selectedList} keySelect={this.state.keySelect} onStockClick = {this.onStockClick}/>
                    </div>
                    <div>
                        <p>Enter Stock Quantity</p>
                        <input 
                            type="text" 
                            autoComplete="off"
                            placeholder="Number of Stcoks"
                            onFocus = {this.onFocusOfInput}
                            onChange = {this.onChangeHandler}
                            value={this.state.numberOfStocks}
                            name="numberOfStocks"
                        />
                    </div>
                </div>
                <div className="field-rows">
                    <div>
                        <p>Enter Stock Price </p>
                        <input 
                            type="text" 
                            autoComplete="off"
                            placeholder="Stock price"
                            onFocus = {this.onFocusOfInput}
                            onChange = {this.onChangeHandler}
                            value={this.state.price}
                            name="price"
                        />
                    </div>
                    <div>
                        <p>Enter Date</p>
                        <input 
                            type="date" 
                            autoComplete="off"
                            onFocus = {this.onFocusOfInput}
                            placeholder="Select date"
                            onChange = {this.onChangeHandler}
                            name="stockDate"
                            value={this.state.stockDate}
                        />
                    </div>
                </div>
                <div className="add-stock-btn">
                    {this.state.errMsg && <p className="err-msg">{this.state.errMsg}</p>}
                    <button type="button" className="btn btn-outline-success"
                        onClick={this.submitStock}
                    >Add Stock</button>
                </div>
            </div>
        )
    }
}

export default AddStock;