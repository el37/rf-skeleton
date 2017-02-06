var HTTP = require('../services/httpservice.js');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var AppStore = Reflux.CreateStore({

});

var TodoStore = Reflux.createStore({

})

module.exports = {
  Ing: AppStore,
  Todo: TodoStore
}
