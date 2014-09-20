
var baseUrl = '/_api/combis';

function Combi(name) {

}

Combi.prototype.save = function() {
};

Combi.prototype.update = function() {};

Combi.prototype.destroy = function() {};

// --- Store
var _combis = [];

var Combis = {

  createCombi: function(name) {
    _combis.push(new Combi(name));
  }

};

module.exports = Combis;
