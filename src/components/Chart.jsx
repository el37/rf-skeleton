import React from 'react';
import ReactHighchart from 'react-highcharts';

var Chart = React.createClass({

  getInitialState: function(){
    return {
      config: {
        title: {
          text: ""
        },
        xAxis: {
          categories: []
        },
        series: [
          {
            name: 'Stock Price',
            data: [],
            marker: {
              enabled: true
            }
          },
          {
            name: 'VWAP',
            data: []
          },
        ]
      }
    }
  },
  componentWillMount(){

    var newStockData = this.props.data;
    this.state.config.title.text = this.props.title
    if(this.state.config.series[0].data.length === 0){
      this.state.config.series[0].data.push(this.props.data)
    }else{
      var index = this.state.config.series[0].data.length - 1;
      if (this.state.config.series[0].data[index] !== this.props.data){
        this.state.config.series[0].data.push(this.props.data)
        //charts.seris[0].addPoint(this.props.data);
        //chart.series[0].addPoint(this.props.data);
        this.state.config.series[0].marker.enabled = false
      }
    }
    this.state.config.series[1].data = this.props.vwap

  }
  render(){
    return (

      <div className="col-sm-12 col-md-6 col-lg-3">
        <ReactHighchart config={this.state.config} ref="chart" />
      </div>
      );
  }
})

module.exports = Chart;
