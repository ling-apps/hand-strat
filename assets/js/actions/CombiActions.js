var AppDispatcher = require('../Dispatcher');

var CombiActions = {

  saveCombi: function(combi) {
    AppDispatcher.handleViewAction({
      actionType: 'COMBI_SAVE',
      combi: combi
    });
  },

  removeCombi: function(id) {
    AppDispatcher.handleViewAction({
      actionType: 'COMBI_REMOVE',
      combiId: id
    });
  }
};

module.exports = CombiActions;
