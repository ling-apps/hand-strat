var request = require('superagent');
var EventEmitter = require('events').EventEmitter;
var baseUrl = '/_api/combis';

function Combi(name) {
  this.name = name;
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
    }.bind(this));
};

Combi.prototype.update = function() {};

Combi.prototype.destroy = function() {};

// --- Store
var _combis = [];
var E = new EventEmitter();

var Combis = {
  getAll: function() {
    return _combis;
  },

  createCombi: function(name) {
    var combi = new Combi(name);
    combi.save();
    _combis.push(combi);
    E.emit('change');
  },

  addChangeListener: function(cb) {
    E.on('change', cb);
  },

  removeChangeListener: function(cb) {
    E.removeListener('change', cb);
  }

};

module.exports = Combis;

