var AppView = require('./views/app');
var StrategieView = require('./views/strategie');
var Firebase = require('./data');

var App = {
    currentView: null,
    _goto: function(routes) {

        if (App[routes]) {
            if (this.currentView) {
                this.currentView.destroy.call(this.currentView);
            }

            App[routes].call(this);
        }
    },
    init: function() {
        var appView = new AppView('#app-wrapper');
        appView.render();

        this._goto('strat');
    },
    strat: function() {
        var Firebase = require('firebase');

        var firebaseUrl = 'https://hand-strat.firebaseio.com/';
        var firebase = new Firebase(firebaseUrl);
        var combis = firebase.child('/combis');
        function onSave(combi) {
          combis.push(combi)
        }
        function onRemove(combiId) {
          combis.child(combiId).remove()
        }
        var stratView = new StrategieView('#content', onSave, onRemove);
        stratView.setModel([]);
        combis.on('value', function(snapshot) {
          var objectList = snapshot.val();
          if (objectList === null || objectList === undefined) return;
          var keys = Object.keys(objectList);
          var combiList = keys.reduce(function(combiList, key) {
            combiList.push(Object.assign({}, {id: key}, objectList[key]));
            return combiList;
          }, []);
          stratView.setModel(combiList);
        });
        this.currentView = stratView;
    }
};

App.init();
