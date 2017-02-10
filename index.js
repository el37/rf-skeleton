var express = require('express');
var app = express();

var server = app.listen(3001);
var io = require('socket.io').listen(server);
var url = 'http://localhost:3001/data';
var data = require('./public/data.js');

var transactionData = require('./public/transactionData.js');
var updateData = [];

function getStockData(data){
  var dataLength = data.length;
  console.log('Current Data Length : %s', dataLength);

  var lastDataIndex = dataLength - 1;
  var lastData = data[lastDataIndex];

  updateData.push(lastData)
  //updateData = lastData;
  console.log('Pushing Stock Data : %s', JSON.stringify(updateData));
  data.pop();
  console.log('New Data length : %s', data.length);
}

app.use(express.static('./public'));
app.use('/data', express.static('./public/appData.json'));
io.on('connection', function(socket){
  socket.emit('sendData', data);
  setInterval(function(){
    getStockData(transactionData);
    socket.emit('dataUpdate', updateData);
    updateData.pop();
    //updateData = "";
  },6000);
});
console.log("Running 'http://localhost:3001'");

//var number = "3,000";
//console.log(typeof(parseInt(number.replace(',',""))));
