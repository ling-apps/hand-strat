var request = require('superagent');
var EventEmitter = require('events').EventEmitter;
var baseUrl = '/_api/combis';

function createCombi(combi) {
  _combis.push(combi);
  request
    .post(baseUrl)
    .set('Accept', 'application/json')
    .send(combi)
    .end(function(err, res) {
      if (err)
        return console.log(err);

      combi.id = res.body.id;
      E.emit('change');
    }.bind(this));
}

function updateCombi(combi) {
  var c = _combis.filter(function(_combi, index) {
    return combi.id == _combi.id;
  })[0];
  c.name = combi.name;
  request
    .put(baseUrl + '/' + combi.id)
    .set('Accept', 'application/json')
    .send(combi)
    .end(function(err, res) {
      if (err)
        return console.log(err);

      E.emit('change');
    }.bind(this));
}

function removeCombi(combiId) {
  request
    .delete(baseUrl + '/' + combi.id)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err)
        return console.log(err);

      this.id = res.body.id;
      E.emit('change');
    }.bind(this));
}

function saveCombi(combi) {
  combi.id ? updateCombi(combi) : createCombi(combi);
}

// --- Store
var _combis = [];
var E = new EventEmitter();


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
          _combis.push(combi);
        });
        E.emit('change');
      }.bind(this));
  }

};

var AppDispatcher = require('../Dispatcher');
AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {
    case 'COMBI_SAVE':
      combi = action.combi;
      saveCombi(combi);
      break;

    case 'COMBI_REMOVE':

  }

});

module.exports = Combis;
