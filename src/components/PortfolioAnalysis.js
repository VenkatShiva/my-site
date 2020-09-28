import React, { Component } from 'react';
import PieChartComponent from '../canvasjs/PieChartComponent';
import LineChartComponet from '../canvasjs/lineChartComponent';

const myFontFamily = "Yanone Kaffeesatz";
const myColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(255, 107, 181, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(110, 255, 174, 1)'
]

class PortfolioAnalysis extends Component{
    state = {
        stocks:[],
        currentPrices:{}
    }
    static getDerivedStateFromProps = (newProps,_oldProps) => {
        const { stocks ,currentPrices } = newProps;
        return { 
            stocks: stocks.slice(),
            currentPrices: {...currentPrices}
         };
    }
    getLineChartConfig = () => {
        const { stocks, currentPrices } = this.state;
        const ivestmentDataPoints = [], returnsDataPoints = [], percentageReturn = [];
        let totalIvestment = 0, totalReturns = 0;
        const currentPricesLength = Object.keys(currentPrices).length;
        let highestReturn = - Infinity, lowestReturn = Infinity, highIndex, lowIndex;
        stocks.forEach(
            (eachStock,index1) => {
                let numberOfShares = 0;
                const { allStocks, stock } = eachStock;
                const { Symbol, 'Company Name': name } = stock;
                let totalStockInvestment = 0;
                let stockPresentValue = 0;
                allStocks.forEach(
                    (eachTime, index2) => {
                        const { numberOfStocks, price } = eachTime;
                        totalStockInvestment += parseInt(numberOfStocks) * parseFloat(price);
                        numberOfShares += numberOfStocks;
                    }
                );
                stockPresentValue = currentPricesLength > 0 ? parseFloat(currentPrices[Symbol]) * numberOfShares : totalStockInvestment;
                ivestmentDataPoints.push( { label: name, y: parseFloat(totalStockInvestment.toFixed(2)) } );
                returnsDataPoints.push( { label: name, y: parseFloat(stockPresentValue.toFixed(2)) } );
                const percentage = ( stockPresentValue / totalStockInvestment - 1 ) * 100;
                percentageReturn.push( { label: name, y: parseFloat(percentage.toFixed(2)) })
                totalIvestment += totalStockInvestment;
                totalReturns += stockPresentValue;
                if(highestReturn < percentage){
                    highIndex = index1;
                    highestReturn = percentage;
                }
                if(lowestReturn > percentage){
                    lowIndex = index1;
                    lowestReturn = percentage;
                }
            }
        );
        percentageReturn[highIndex] = Object.assign(percentageReturn[highIndex], {  indexLabel: "Highest Returns", markerColor: "Green", markerType: "cross" });
        percentageReturn[lowIndex] = Object.assign(percentageReturn[lowIndex], {  indexLabel: "Lowest Returns", markerColor: "Red", markerType: "cross" });
        return {
            animationEnabled: true,
            exportEnabled: true,
            // zoomEnabled:true,
            // zoomType: "xy",
            title:{
                text: `Investment Vs Returns (${totalIvestment.toFixed(2)} - ${totalReturns.toFixed(2)})`,
                fontFamily: myFontFamily,
            },
            axisX:{
                labelFontFamily: myFontFamily,
                title: 'Companies',
                titleFontFamily: myFontFamily,
            },
            axisY:[{
                title: 'Amount',
                lineColor: myColors[0],
                tickColor: myColors[0],
                labelFontColor: myColors[0],
                titleFontColor: myColors[0],
                includeZero: true,
                labelFontFamily: myFontFamily,
                titleFontFamily: myFontFamily,
                gridDashType: 'dash',
                gridThickness: 1
            },
            // {
            //     title: 'Returns',
            //     lineColor: myColors[1],
            //     tickColor: myColors[1],
            //     labelFontColor: myColors[1],
            //     titleFontColor: myColors[1],
            //     includeZero: true,
            //     labelFontFamily: myFontFamily,
            //     titleFontFamily: myFontFamily,
            //     gridDashType: 'dash',
            //     gridThickness: 1
            // }
        ],
            axisY2:{
                title: 'Percentage',
                lineColor: myColors[2],
                tickColor: myColors[2],
                labelFontColor: myColors[2],
                titleFontColor: myColors[2],
                includeZero: true,
                labelFontFamily: myFontFamily,
                titleFontFamily: myFontFamily,
                gridDashType:'dash',
                gridThickness: 0,
                suffix: '%'
            },
            toolTip: {
                shared: true,
                fontFamily: myFontFamily,
            },
            legend: {
                cursor: "pointer",
                fontFamily: myFontFamily,
            },
            data: [
            {
                type: "line",
                name: "Percentage",
                color: myColors[2],
                showInLegend: true,
                axisYIndex: 0,
                axisYType: "secondary",
                dataPoints: percentageReturn,
                lineDashType: "dash",
                // fontFamily: myFontFamily,
                indexLabelFontSize:15,
            },
            {
                type: "line",
                name: "Returns",
                color: myColors[1],
                showInLegend: true,
                axisYIndex: 0,
                // axisYType: "secondary",
                dataPoints: returnsDataPoints,
                // fontFamily: myFontFamily,
                indexLabelFontSize:15,
            },
            {
                type: "line",
                name: "Investments",
                color: myColors[0],
                showInLegend: true,
                axisYIndex: 1,
                lineDashType: "dash",
                dataPoints: ivestmentDataPoints,
                // fontFamily: myFontFamily,
                indexLabelFontSize:15,
            },
            ],
        }
    }
    getDefaultConfig = (title, subtitle) => {
        // let toolTip = type === 'pie' ? "{name} {y} (#percent%)" : "{name} {y}"
        return {
            exportEnabled: true,
            animationEnabled: true,
            // backgroundColor: "#f5faff",
			title: {
                text: title,
                fontFamily: myFontFamily,
			},
			subtitles: [{
				text: subtitle,
				verticalAlign: "center",
                fontSize: 24,
                fontWeight:"bold",
                fontColor:"black",
                zIndex:'9999',
                fontFamily: myFontFamily,
            }],
            toolTip:{
                fontFamily: myFontFamily,
            },
            legend:{
                fontFamily: myFontFamily,
                fontSize: 14,
                fontWeight: 'normal'
            },
            axisX:{
                labelFontFamily: myFontFamily
            },
            axisY:{
                labelFontFamily: myFontFamily
            },
			data: [
                {
                type: '',
                // indexLabelPlacement: "inside",
                // startAngle:  225,
                legendText:'All numbers in indian rupees(₹)',
				showInLegend: true,
                indexLabel: "{name} : {y}",
                toolTipContent: '',
                fontFamily: myFontFamily,
                indexLabelFontSize:15,
                dataPoints:[]
                }
            ]
        }
    }
    getInvestmentData = () => {
        const { stocks } = this.state;
        let totalAmount = 0;
        const investmentData = stocks.map( (eachStock, index) =>{
            const {'Company Name': name } = eachStock.stock;
            const stockList = eachStock.allStocks.slice();
            let total = 0;
            stockList.forEach(element => {
                const { numberOfStocks, price } = element;
                total += ( parseInt(numberOfStocks) * parseFloat(price) )
            });
            totalAmount += total;
            return {
                name,
                label:name,
                y: total,
                color: myColors[index],
                indexLabelFontFamily: myFontFamily,
                legendText: name+': '+ (total).toFixed(2)
            }
        });
        const configWithData = this.getDefaultConfig('Investment', 'Invested: '+(totalAmount).toFixed(2), 'pie');
        configWithData.data[0]['dataPoints']= investmentData;
        return configWithData;
    }
    getReturnsData = () => {
        const { currentPrices } = this.state;
        // debugger;
        if(Object.keys(currentPrices).length > 0){
            const { stocks } = this.state;
            let totalAmount = 0;
            let totalAmountInvestment = 0;
            const investmentData = stocks.map( (eachStock, index) =>{
                const {'Company Name': name, 'Symbol': symbol } = eachStock.stock;
                const stockList = eachStock.allStocks.slice();
                let totalInvest = 0;
                let totalStcoks = 0;
                const currentPrice = currentPrices[symbol];
                stockList.forEach(element => {
                    const { numberOfStocks, price } = element;
                    totalInvest += ( parseInt(numberOfStocks) * parseFloat(price) )
                    totalStcoks += parseInt(numberOfStocks);
                });
                totalAmountInvestment += totalInvest;
                const total = parseFloat(currentPrice) * totalStcoks;
                totalAmount += total;
                return {
                    name,
                    label:name,
                    y: total,
                    color: myColors[index],
                    indexLabelFontFamily: myFontFamily,
                    legendText: name+': '+total.toFixed(2)
                }
            });
            const returns = (totalAmount - totalAmountInvestment).toFixed(2);
            const percentage = ( ( returns / totalAmountInvestment ) * 100 ).toFixed(2)
            const configWithData = this.getDefaultConfig('Present Value', 'Returns : '+returns+'(' + percentage + '%)', 'pie');
            configWithData.isUpdated=true;
            configWithData.data[0]['dataPoints']= investmentData
            return configWithData;
        }else{
            return this.getInvestmentData();
        }
    }
    getSectorInvestmentData = () => {
        const { stocks } = this.state;
        let totalAmount = 0;
        let index = 0;
        let sectorData = {};
        stocks.forEach( element => {
            const {'Industry': name,} = element.stock;
            let total = 0;
            const stockList = element.allStocks.slice();
            stockList.forEach(element => {
                const { numberOfStocks, price } = element;
                total += ( parseInt(numberOfStocks) * parseFloat(price) )
            });
            totalAmount += total;
            if(sectorData[name]){
                let { y } = sectorData[name];
                sectorData[name]['y'] = y + total;
                sectorData[name]['legendText'] = name+': '+ (y + total).toFixed(2);
            }else{
                sectorData[name] = {
                            name,
                            label:name,
                            y: total,
                            color: myColors[index],
                            indexLabelFontFamily: myFontFamily,
                            legendText: name+': ' + (total).toFixed(2)
                        }
                index++;
            }
        });
        const configWithData = this.getDefaultConfig('Investment', 'Invested: '+(totalAmount.toFixed(2)), 'pie');
        configWithData.data[0]['dataPoints']= Object.values(sectorData);
        return configWithData;
    }
    getSectorReturnData = () => {
        const { currentPrices } = this.state;
        // debugger;
        if(Object.keys(currentPrices).length > 0){
            let totalAmount = 0, totalAmountInvestment = 0;
            const { stocks } = this.state;
            let index = 0;
            let sectorData = {};
            stocks.forEach( element => {
                const {'Industry': name, 'Symbol': symbol} = element.stock;
                let total = 0;
                let totalStcoks = 0;
                const stockList = element.allStocks.slice();
                stockList.forEach(element => {
                    const { numberOfStocks, price } = element;
                    totalAmountInvestment += ( parseInt(numberOfStocks) * parseFloat(price) )
                    totalStcoks += parseInt(numberOfStocks);
                });
                total = totalStcoks * parseFloat(currentPrices[symbol]);
                totalAmount += total;
                if(sectorData[name]){
                    let { y } = sectorData[name];
                    sectorData[name]['y'] = y + total;
                    sectorData[name]['legendText'] = name+': '+ (y + total).toFixed(2);
                }else{
                    sectorData[name] = {
                                name,
                                label:name,
                                y: total,
                                color: myColors[index],
                                indexLabelFontFamily: myFontFamily,
                                legendText: name+': '+total.toFixed(2)
                            }
                    index++;
                }
            });
            const returns = (totalAmount - totalAmountInvestment).toFixed(2);
            const percentage = ( ( returns / totalAmountInvestment ) * 100 ).toFixed(2)
            const configWithData = this.getDefaultConfig('Present Value', 'Returns : '+returns+'(' + percentage + '%)', 'pie');
            configWithData.isUpdated=true;
            configWithData.data[0]['dataPoints']= Object.values(sectorData);
            return configWithData;
        }else{
            return this.getSectorInvestmentData();
        }
    }
    childClick = (event) => {
        // console.log('clccc');
        event.stopPropagation();
    }
    parentClick = (event) => {
        // this.onClancel(event);
        this.props.openPortFolioAnalysis();
    }
    render(){
        const investMentData = this.getInvestmentData();
        const returnsData = this.getReturnsData();
        const sectorData =  this.getSectorInvestmentData();
        const sectorReturns = this.getSectorReturnData();
        const lineChartData = this.getLineChartConfig();
        // debugger;
        const {openPortFolioAnalysis} = this.props;
        return (
            <div className="add-portfolio" onClick={this.parentClick}>
                <div className="portfolio-analysis" onClick={this.childClick}>
                    {/* <h3>Analysis</h3> */}
                    
                    <div className="port-name">
                    <div className="portfolio-heading">
                        <p>Analysis</p>
                    </div>
                    <div className="add-port">
                        <button 
                            onClick={openPortFolioAnalysis} 
                            type="button" 
                            className="btn btn-outline-primary"
                        >Close</button>
                    </div>
                </div>
                <div className="analysis-containers">
                    <div className="portfolio-analysis-1">
                        <div>
                            <LineChartComponet options={lineChartData} heading="Your Investment Vs Present Returns"/>
                        </div>
                    </div>
                    <div className="portfolio-analysis-1">
                        <div>
                            <PieChartComponent options={investMentData} heading="Your Investment" needUpdateLater={false}/>
                        </div>
                        <p className="arrow-mark">➜</p>
                        <div>
                            <PieChartComponent options={returnsData} heading="Your Investment Present Value" needUpdateLater={true}/>
                        </div>
                    </div>
                    <div className="portfolio-analysis-1">
                        <div>
                            <PieChartComponent options={sectorData} heading="Industry" needUpdateLater={false}/>
                        </div>
                        <p className="arrow-mark">➜</p>
                        <div>
                            <PieChartComponent options={sectorReturns} heading="Industry returns" needUpdateLater={true}/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default PortfolioAnalysis;