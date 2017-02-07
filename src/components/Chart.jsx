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
            data: []
          },
          {
            name: 'VWAP',
            data: []
          },
        ]
      }
    }
  },
  render(){
    this.state.config.title.text = this.props.title
    this.state.config.series[0].data = this.props.data
    this.state.config.series[1].data = this.props.vwap
    return <ReactHighchart config={this.state.config} ref="chart" />;
  }
})

module.exports = Chart;
