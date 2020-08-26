import React,{ Component } from 'react';

class MyDropDown extends Component{
    componentDidUpdate = ()=>{
        // debugger;
        if(this.ulContainer && this.nameInput){
            // debugger;
            // offsetHeight this.ulContainer.scrollTop = this.nameInput.offsetTop
            const liHeight = this.nameInput.offsetHeight;
            const liScrollTop = this.nameInput.offsetTop;
            const totalHeight = liHeight + liScrollTop;
            const divScrollTop = this.ulContainer.scrollTop;
            if(liScrollTop < divScrollTop){
                this.ulContainer.scrollTop =  liScrollTop;
            }
            if(totalHeight > divScrollTop+150){
                this.ulContainer.scrollTop = liHeight + liScrollTop - 150;
            }
        }
        if(this.ulContainer && !this.nameInput){
            this.ulContainer.scrollTop = 0;
        }
    }
    render(){
        const { selectedList, keySelect } = this.props;
        if(selectedList && selectedList.length > 0){
            const {  onStockClick } = this.props;
            const list = selectedList.map((li,index)=>{
                return (
                    <li key={`dropdown-${index}`}
                    onClick={()=>onStockClick({symbol:li['Symbol'],name:li['Company Name']})}
                    className={keySelect-1 === index ? 'selected' : '' }
                    ref={
                        (li) => { 
                        if(keySelect-1 === index){
                            this.nameInput = li;
                        }
                    }
                    } 
                    >
                        {li['Company Name']}
                    </li>
                )   
            });
            return (
                <div className="my-dropdown" >
                    <ul 
                    ref = {
                        (ref)=>{
                            this.ulContainer = ref;
                        }
                    }
                    >
                        {
                        list
                        }
                    </ul>
                </div>
            )
        }
        return null;
    }
}

export default MyDropDown;