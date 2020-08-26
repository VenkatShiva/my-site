import React from 'react';

function ViewmoreStock(props){
    // const { index, stockDate, price, numberOfStocks } = 
    // debugger;
    let { numberOfStocks, price, stockDate } = props.element;
    // let { symbol, industry, isin } = props.stockDetails;
    numberOfStocks = parseInt(numberOfStocks);
    price = parseFloat(price);
    return (
        <div className="stock-details-body"
            key={'details-body-' + props.index}
        >   
            <div>
                <p>
                    {stockDate}
                </p>
            </div>
            <div>
                <p>
                    {price.toFixed(2)}
                </p>
            </div>
            <div>
                <p>
                    {numberOfStocks}
                </p>
            </div>
        </div>
    )
}

export default ViewmoreStock;