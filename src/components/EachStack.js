import React,{ Component, createRef } from 'react';
import ViewmoreStock from './ViewmoreStock';

class EachStack extends Component{
    state = {
        opened: false,
        elem:{},
        index:'',
        currentPrices:{}
    }
    stockRef = createRef()
    static getDerivedStateFromProps = (newProps,_oldProps) => {
        const { elem, index, currentPrices } = newProps;
        // debugger;
        return { 
            elem,
            index,
            currentPrices
         };
    }
    onClickHandler = (event) => {
        // debugger;
        this.setState( prevState => {
            return {
                opened: !prevState.opened
            }
        });
        setTimeout(()=>{
            this.stockRef.current.scrollIntoView({
                behavior: 'smooth',
                block:'nearest'
            },0);
        })
    }
    render(){
        const { elem, index, currentPrices } = this.state;
        const { 'Company Name': name, 'Symbol': symbol, 'Industry': industry, 'ISIN Code': isin } = elem.stock;
        const stockList = elem.stock ? elem.allStocks.slice() : [];
        // console.log(name,symbol,stockList);
        let quantity = 0, totalAmount = 0, isPositive = null;
        let stockDetails = [];
        stockList.forEach((element,index) => {
            // debugger;
            let { numberOfStocks, price } = element;
            numberOfStocks = parseInt(numberOfStocks);
            price = parseFloat(price);
            quantity += numberOfStocks;
            totalAmount += numberOfStocks * price;
            const stockDetail = (
                <ViewmoreStock element={element} index={index} key={'viewmore-'+index}/>
            )
            stockDetails.push(stockDetail);
        });
        const avgPrice = ( totalAmount / quantity ).toFixed(2);
        let currentPrice = currentPrices[symbol];
        let presentValue, profitOrLoss, percentage;
        if(currentPrice){
            presentValue = quantity * currentPrice;
            profitOrLoss = presentValue - totalAmount;
            isPositive = profitOrLoss >= 0 ? true : false;
            percentage = ( profitOrLoss / totalAmount ) * 100;
        }
        currentPrice = typeof currentPrice === "number" ? currentPrice.toFixed(2) : '-';
        presentValue =  typeof presentValue === "number" ? presentValue.toFixed(2) : '-';
        profitOrLoss =  typeof profitOrLoss === "number" ? profitOrLoss.toFixed(2) : '-';
        percentage =  typeof percentage === "number" ? percentage.toFixed(2) : '-';
        // console.log(quantity, totalAmount, avgPrice, presentValue, profitOrLoss, percentage, isPositive);
        return (
            <div className="eachstock-container"
                onClick={this.onClickHandler}
                key={'portstock-'+index}
                id={this.state.opened ? 'open-details':''}
                ref={this.stockRef}
                >
                <div className="portfolio-each-stocks" key={"each-stock"+index}>
                    <div>
                        <p>{name}</p>
                    </div>
                    <div>
                        <p>{quantity}</p>
                    </div>
                    <div>
                        <p>{avgPrice}</p>
                    </div>
                    <div>
                        <p>{currentPrice}</p>
                    </div>
                    <div>
                        <p>{presentValue}</p>
                    </div>
                    <div>
                        <p>
                            <span>{profitOrLoss === '-' ? profitOrLoss : isPositive === true ? '+'+profitOrLoss : profitOrLoss}</span>
                            <span style={{color:isPositive ===  null ? '' : isPositive ? '#0ba600':'red'}}>{percentage === '-' ? "" : ' ('+percentage+'%)'}</span>
                        </p>
                    </div>
                </div>
                    <div className="stock-details">
                        <div className="stock-details-header">
                            <div style={{textAlign:'left', paddingLeft:'5px'}}>
                                <p>
                                    Details
                                </p>
                            </div>
                            <div>
                                <p>
                                    Date
                                </p>
                            </div>
                            <div>
                                <p>
                                    Price
                                </p>
                            </div>
                            <div>
                                <p>
                                    Quantity
                                </p>
                            </div>
                        </div>
                        <div style={{display:'flex'}}>
                            <div style={{flex:'1', paddingLeft:'5px'}}>
                                <div>
                                    <p>
                                        Symbol: {symbol} <br />
                                        Industry: {industry} <br />
                                        ISIN no: {isin} <br />
                                    </p>
                                </div>
                            </div>
                            <div style={{flex:'3'}}>
                                {stockDetails}
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
export default EachStack;