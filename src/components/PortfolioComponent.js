import React, { Component } from 'react';
import PortfolioContent from './PortfolioContent';
import LoadingElement from './LoadingElem';

class PortfolioComponent extends Component{
    state = {
        portfolios:[],
        openedStocks:[],
        loading: true,
        myportfolio: []
    }
    static getDerivedStateFromProps = (newProps,_oldProps) => {
        // debugger;
        let { allPortfolios, loading, myportfolio } = newProps;
        if(Object.keys(allPortfolios) <= 0 ){
            // allPortfolios = 
        }
        return { portfolios: Array.isArray(allPortfolios) ? allPortfolios : [], loading, myportfolio: Array.isArray(myportfolio) ? myportfolio : [] };
    }
    getPortfolios = (list, editable) => {
        let AllPortfolios = []
        AllPortfolios = list.map( (port,index) => {
            return (
                <PortfolioContent
                 editable = {editable}
                 portfolio = {{...port}} key={'portfolio-content'+index}/>
            )
        })
        return AllPortfolios;
    }
    render(){
        // debugger;
        if(this.state.loading){
            return (
            <div id="portfolio-loading">
                <LoadingElement />
            </div>);
        }
        let myPortfolio = [], yours = [];
        if(this.state.myportfolio.length < 1){
            myPortfolio =  (<div className="center-mode">My portfolio not availble at this moment.</div>);
        } else {
            myPortfolio = this.getPortfolios(this.state.myportfolio, false);
        }
        if(this.state.portfolios.length > 0){
            yours = this.getPortfolios(this.state.portfolios, true);
        }
        // myPortfolio = this.state.portfolios.slice(0,1);
        // yours = this.state.portfolios.slice(1,);
        // myPortfolio = this.getPortfolios(myPortfolio);
        // if(yours.length > 0){
        //     yours = this.getPortfolios(yours);
        // }
        // const AllPortfolios = this.state.portfolios.map( (port,index) => {
        //     return (
        //         <PortfolioContent portfolio = {{...port}} key={'portfolio-content'+index}/>
        //     )
        // })
        return (
            <div className="portfolios-added pad-rem">
                {myPortfolio}
                { yours.length > 0 ? 
                (
                <>
                    <div className="center-mode pad-rem">
                        Your Portfolio(s)
                    </div>
                    {yours}
                </>
                )
                :
                null
                }
            </div>
        )
    }
}
export default PortfolioComponent;