var express = require('express');
var app = express();

var server = app.listen(3000);
var io = require('socket.io').listen(server);
var url = 'http://localhost:3000/data';
var data = require('./public/data.js');

app.use(express.static('./public'));
app.use('/data', express.static('./public/appData.json'));
io.on('connection', function(socket){
  socket.emit('sendData', data);
});
console.log("Running 'http://localhost:3000'");
