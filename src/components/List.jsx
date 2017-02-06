import React from 'react';

import Chart from './Chart.jsx';

var List = React.createClass({
  render(){
    return(
        <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Chart title={"ANTAM"} categories={["jan","feb","mar","apr"]} data={[17,23,39,30]} vwap={[18,15,11,10]} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Chart title={"PPRO"} categories={["jan","feb","mar","apr"]} data={[10,20,30,40]} vwap={[10,13,8,16]} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Chart title={"SMGR"} categories={["jan","feb","mar","apr"]} data={[6,10,18,20]} vwap={[30,19,4,13]} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Chart title={"BBCA"} categories={["jan","feb","mar","apr"]} data={[10,11,15,20]} vwap={[40,23,18,26]} />
        </div>
      </div>
    )
  }
});

module.exports = List;
