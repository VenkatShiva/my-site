import React from 'react';
import deleteImg from '../images/delete.png';

function StockRow(props){
    const {companyName,numberOfStocks,price,totalAmount,deleteStock,symbol,index} = props;
    return (
        <div  className="stocks-list">
            <div style={{flex:"0.75"}}>
                <p>{companyName}</p>
            </div>
            <div>
                <p>{numberOfStocks}</p>
            </div>
            <div>
                <p>₹ {price}</p>
            </div>
            <div>
                <p>₹ {totalAmount}</p>
            </div>
            <div className="delete-btn">
                <img 
                    src={deleteImg} 
                    alt="Delete Stock"
                    onClick={ () => { deleteStock({symbol,index}); }}
                />
                {/* <button className="btn btn-outline-danger"> Delete </button> */}
            </div>
        </div>
    )
}

function AddedStock(props) {
    const { addedStocks, deleteStock } = props;
    // console.log(addedStocks);
    const StockList = [];
    for(let symbol in addedStocks){
        const { stock, allStocks } = addedStocks[symbol];
        const  { 'Company Name': companyName} = stock
        allStocks.map( (elem,index) => {
            const {numberOfStocks,price} = elem;
            let totalAmount = parseInt(numberOfStocks) * parseFloat(price);
            totalAmount = totalAmount.toFixed(2)
            StockList.push(
            <StockRow 
                companyName={companyName}
                deleteStock={deleteStock}
                numberOfStocks={numberOfStocks}
                price={price}
                totalAmount={totalAmount}
                symbol={symbol}
                index={index}
                key={'addedstocks-'+ symbol +index}
            />)
            return null;
            
        })    
    }
    // addedStocks.map((elem, index) => {
    //     const { stock, numberOfStocks, price } = elem;
    //     const { 'Company Name': companyName, 'Symbol': symbol } = stock;
    //     let totalAmount = parseInt(numberOfStocks) * parseFloat(price);
    //     totalAmount = totalAmount.toFixed(2)
    //     return (
    //         <div  className="stocks-list" key={"stockList"+index}>
    //             <div style={{flex:"0.75"}}>
    //                 <p>{companyName}</p>
    //             </div>
    //             <div>
    //                 <p>{numberOfStocks}</p>
    //             </div>
    //             <div>
    //                 <p>₹ {price}</p>
    //             </div>
    //             <div>
    //                 <p>₹ {totalAmount}</p>
    //             </div>
    //             <div className="delete-btn">
    //                 <img 
    //                     src={deleteImg} 
    //                     alt="Delete Stock"
    //                     onClick={ () => { deleteStock(symbol); }}
    //                 />
    //                 {/* <button className="btn btn-outline-danger"> Delete </button> */}
    //             </div>
    //         </div>
    //     )
    // })
    if(StockList && StockList.length > 0){
        return (
            <div className="added-stocks">
                    <div className="stocks-heading">
                        <div style={{flex:"0.75"}}>
                            <p>
                                Stock Name
                            </p>
                        </div>
                        <div>
                            <p>
                                Stock Quantity
                            </p>
                        </div>
                        <div>
                            <p>
                                Stock Price
                            </p>
                        </div>
                        <div>
                            <p>
                                Total Amount
                            </p>
                        </div>
                        <div className="delete-btn">
                            {/* <button className="btn btn-outline-danger"> */}
                            <p>
                                Delete
                            </p>
                            {/* </button> */}
                        </div>
                    </div>
                    <div className="listof-stocks">
                        {StockList}
                    </div>
            </div>
        )
    }
    return null;
}

export default AddedStock;