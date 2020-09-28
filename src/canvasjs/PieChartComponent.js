import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChartComponent extends Component {
    state = {
        options:{},
        type: '',
        heading:'',
        needUpdateLater: null
    }
    static getDerivedStateFromProps = (newProps,state) => {
        // debugger;
        if(state.needUpdateLater ===  null || state.needUpdateLater){
            // debugger;
            const options  = {...newProps.options};
            let { needUpdateLater } = newProps
            const { isUpdated } = options;
            needUpdateLater = isUpdated ? false : needUpdateLater;
            options.data[0]['type']='pie';// toolTipContent
            options.data[0]['toolTipContent'] = '{name} {y} (#percent%)';
            return { 
                options,
                type:'pie',
                heading: newProps.heading,
                needUpdateLater
            };
        }
        return null;
    }
    changeChartType = (type) => {
        // debugger;
        if( type !== this.state.type ){
            this.setState( (prevStat,props) => {
                // debugger;
                // const options  = JSON.parse(JSON.stringify(prevStat.options))
                const options = JSON.parse(JSON.stringify(prevStat.options))
                if(type === 'column'){
                    options.subtitles[0].text = '';
                    options.data[0]['legendMarkerColor']='black';
                    options.data[0]['indexLabel']='{y}';
                    // indexLabel: "{name} : {y}",
                    // options.data[0].legendText = "All numbers in indian rupees(₹)"
                } else {
                    const { text: subtitle }= props.options.subtitles[0];
                    options.subtitles[0].text = subtitle;
                    options.data[0]['legendMarkerColor']='';
                    options.data[0]['indexLabel']='{name} : {y}';
                }
                options.data[0]['type']=type;// toolTipContent
                
                options.data[0]['toolTipContent'] = type === "pie" ? '{name} {y} (#percent%)':'{name} {y}';
                return {
                    options,
                    type
                }
            })
        }
    }
	render() {
		return (
		<>
            <div className="chart-heading">
                <p>{this.state.heading}</p>
                <div className="chart-choice">
                    <button onClick={(event)=>{this.changeChartType('pie')}}
                        className="btn btn-primary" type="button"
                        disabled={this.state.type === 'pie'}
                    >
                        Pie
                    </button>
                    <button onClick={()=>{this.changeChartType('column')}}
                        className="btn btn-primary" type="button"
                        disabled={this.state.type === 'column' ? true : false}
                    >
                        Column
                    </button>
                </div>
            </div>
            <div>
                <CanvasJSChart options = {this.state.options} containerProps={{maxWidth:""}}/>
            </div>
		</>
		);
	}
}

export default PieChartComponent;