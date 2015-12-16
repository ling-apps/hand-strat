var Firebase = require('firebase');

var firebase = new Firebase('https://hand-strat.firebaseio.com/');

var Firebase = {
  getCombis: function() {
    return firebase.get('combis');
  },
  getCombi: function(id) {
    return firebase.get('combis.' + id);
  },
  createCombi: function(combi) {
    return firebase.push('combis', combi);
  },
  udpateCombi: function(id, combi) {
    return firebase.update('combis.' + id, combi);
  },
  deleteCombi: function(id) {
    return firebase.remove('combis.' + id);
  }
};

module.exports = Firebase;
