import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChartComponent extends Component {
	render() {
        let { heading, options } = this.props;
		return (
		<>
            <div className="chart-heading">
                <p>{heading}</p>
            </div>
            <div>
                <CanvasJSChart options = {options} containerProps={{maxWidth:""}}/>
            </div>
		</>
		);
	}
}

export default PieChartComponent;