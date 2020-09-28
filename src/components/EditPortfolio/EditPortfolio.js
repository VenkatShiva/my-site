import React, { Component } from 'react';

class EditPortfolio extends Component{
    parentClick = (event) => {
        this.props.openEditPortfolio();
    }
    childClick = (event) => {
        // console.log('clccc');
        event.stopPropagation();
    }
    render(){
        return (
            <div className="add-portfolio" onClick={this.parentClick}>
                <div className="portfolio-analysis" onClick={this.childClick}>
                    <div className="port-name">
                        <div className="portfolio-heading">
                            <p>Edit Portfolio</p>
                        </div>
                        <div className="add-port">
                            <button 
                                type="button" 
                                className="btn btn-outline-primary"
                                onClick={this.parentClick} 
                            >Close</button>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}
export default EditPortfolio;