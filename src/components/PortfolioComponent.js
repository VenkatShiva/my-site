import React, { Component } from 'react';
import PortfolioContent from './PortfolioContent';
import LoadingElement from './LoadingElem';

class PortfolioComponent extends Component{
    state = {
        portfolios:[],
        openedStocks:[]
    }
    static getDerivedStateFromProps = (newProps,_oldProps) => {
        // debugger;
        const { allPortfolios } = newProps;
        return { portfolios: allPortfolios };
    }
    render(){
        // debugger;
        if(this.state.portfolios.length <= 0){
            return (
            <div id="portfolio-loading">
                <LoadingElement />
            </div>);
        }
        const AllPortfolios = this.state.portfolios.map( (port,index) => {
            return (
                <PortfolioContent portfolio = {{...port}} key={'portfolio-content'+index}/>
            )
        })
        return (
            <div className="portfolios-added">
                {AllPortfolios}
            </div>
        )
    }
}
export default PortfolioComponent;