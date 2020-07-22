import React, { Component } from 'react';

class PortfolioComponent extends Component{
    state = {
        portfolios:[]
    }
    static getDerivedStateFromProps = (newProps,_oldProps) => {
        const { allPortfolios } = newProps;
        return { portfolios: allPortfolios };
    }
    render(){
        return (
            <div>These are all portfolioss</div>
        )
    }
}
export default PortfolioComponent;