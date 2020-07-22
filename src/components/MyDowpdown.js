import React from 'react';

function MyDropDown(props){
    const { selectedList } = props;
    if(selectedList && selectedList.length > 0){
        const { selectedList, onStockClick } = props;
        const list = selectedList.map((li,index)=>{
            return (
                <li key={`dropdown-${index}`} onClick={()=>onStockClick({symbol:li['Symbol'],name:li['Company Name']})}>{li['Company Name']}</li>
            )   
        });
        return (
            <div className="my-dropdown" >
                <ul>
                    {
                       list
                    }
                </ul>
            </div>
        )
    }
    return null;
}

export default MyDropDown;