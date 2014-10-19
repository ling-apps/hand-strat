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
    console.log(combi);
    this.setState({
      selectedCombi: combi
    });
  },

  render: function() {
    return (
      <div>
        <CombiList onCombiSelect={this.onCombiSelect} />
        <Combi combi={this.state.selectedCombi} />
      </div>
    );
  }

});

module.exports = HandStrat;
