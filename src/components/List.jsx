import React from 'react';
import io from 'socket.io-client';

import Chart from './Chart.jsx';

var List = React.createClass({
  getInitialState: function(){
    return {
      data : {},
      newData: [],
      stockName: [],
      stocksData: []
    }
  },
  componentWillMount(){
    this.socket = io('http://localhost:3001');
    this.socket.on('sendData', this.sendData);
    this.socket.on('dataUpdate', this.updateData);
  },
  sendData(payload){
    var stockName = Object.keys(payload);
    this.setState({ "stockName": stockName});
    this.setState({ "data" : payload });
  },
  updateData(payload){
    this.setState({"newData": payload})
  },
  showData(stockData, i){
    var xxx = this.state.data[stockData]
    var data = []
    if (xxx){
      data = xxx.data;
    }
    return(
        <Chart title={stockData} categories={["jan","feb","mar","apr"]} data={data} vwap={[18,15,11,10]}  key={i} />
    )
  },
  stocks(stock, i){
    //this.state.stocksData.push(stock.Price)
    var DS = parseInt(stock.Price.replace(',',""))
    return(
      <Chart title={"TLKM"} categories={["jan","feb","mar","apr"]} data={DS} vwap={[18,15,11,10]}  key={i} />
    )
  },
  render(){
      //{this.state.stockName.map(this.showData)}
    return(
        <div className="row">
          {this.state.newData.map(this.stocks)}
        </div>
    )
  }
});

module.exports = List;
