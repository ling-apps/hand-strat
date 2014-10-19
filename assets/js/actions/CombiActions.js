var AppDispatcher = require('../Dispatcher');

var CombiActions = {

  createCombi: function(combi) {
    AppDispatcher.handleViewAction({
      actionType: 'COMBI_CREATE',
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
