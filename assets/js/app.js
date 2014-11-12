/** @jsx React.DOM */
var React = require('react');

var CombiList = require('./components/CombiList');
var Combi = require('./components/CombiItem');
var CombiStore = require('./stores/Combis');
CombiStore.load();

var HandStrat = React.createClass({
  getInitialState: function() {
    return {
      selectedCombi: {name: ""}
    };
  },

  onCombiSelect: function(combi) {
    this.setState({
      selectedCombi: combi
    });
  },

  addCombi: function() {
    this.setState({
      selectedCombi: {name: ""}
    });
  },

  render: function() {
    return (
      <div>
        <CombiList selected={this.state.selectedCombi} onCombiSelect={this.onCombiSelect} onAddCombi={this.addCombi}/>
        <Combi combi={this.state.selectedCombi} key={this.state.selectedCombi} />
      </div>
    );
  }

});

module.exports = HandStrat;
