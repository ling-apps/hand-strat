var request = require('superagent');
var EventEmitter = require('events').EventEmitter;
var baseUrl = '/_api/combis';

function Combi(params) {
  this.name = params.name || "";
  this.content = params.content || "";
}

Combi.prototype.save = function() {
  request
    .post(baseUrl)
    .set('Accept', 'application/json')
    .send({name: this.name})
    .end(function(err, res) {
      if (err)
        return console.log(err);

      this.id = res.body.id;
      E.emit('change');
    }.bind(this));
};

Combi.prototype.update = function() {};

Combi.prototype.destroy = function() {};

// --- Store
var _combis = [];
var E = new EventEmitter();

function createCombi(name) {
  var combi = new Combi(name);
  combi.save();
  _combis.push(combi);
}

function removeCombi(id) {
  var combi = null;
  var index = null;
  _combis.map(function(c, i) {
    if (combi.id === id) {
      combi = c;
      index = i;
    }
  });

  combi.destroy();
  _combis.slice(index, 1);
}

var Combis = {
  getAll: function() {
    return _combis;
  },

  addChangeListener: function(cb) {
    E.on('change', cb);
  },

  removeChangeListener: function(cb) {
    E.removeListener('change', cb);
  },

  load: function() {
    request
      .get(baseUrl)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return console.log(err);

        res.body.forEach(function(combi, index) {
          _combis.push(new Combi(combi));
        });
        E.emit('change');
      }.bind(this));
  }

};

var AppDispatcher = require('../Dispatcher');
AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case 'COMBI_CREATE':
      combi = action.combi;
      createCombi(combi);
      break;

    case 'COMBI_REMOVE':

  }

});

module.exports = Combis;
