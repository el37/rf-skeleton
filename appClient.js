var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var data = converter.fromFile("data.csv",function(err,result){
  return result
})

console.log(Object.keys(data));
