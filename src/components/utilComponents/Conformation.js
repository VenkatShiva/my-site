import React, { Component } from 'react';
import LoadingElement from '../LoadingElem';

class EditPortfolio extends Component{
    parentClick = (event) => {
        this.props.onCancel();
    }
    childClick = (event) => {
        event.stopPropagation();
    }
    render(){
        const { loading, warning } =  this.props;
        return (
            <div className="add-portfolio conformation-popup" onClick={this.props.onCancel} id = {loading ? 'loading-warning':''}>
                <div className="portfolio-analysis" onClick={this.childClick}>
                    <div className="port-name">
                        <div className="portfolio-heading">
                            <p>{this.props.heading}</p>
                        </div>
                    </div>
                    {warning && <div>
                        <p style={{fontSize:"0.8rem"}}>{warning}</p>
                    </div>}
                    <div className="my-btn-container">
                        <button type="button" className="btn btn-outline-warning"
                            onClick={this.props.onCancel}
                        >
                            No
                        </button>
                        <button type="button" className="btn btn-outline-success"
                            onClick={this.props.onConfirm}
                        >
                            Yes
                        </button>
                    </div>
                    {loading && <LoadingElement />}
                </div>
            </div>
        )
    }
}
export default EditPortfolio;