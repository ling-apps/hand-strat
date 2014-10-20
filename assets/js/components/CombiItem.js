/** @jsx React.DOM */
var React = require('react');
//var CombiEdit = require('./CombiEdit');
var CombiActions = require('../actions/CombiActions');

var Combi = React.createClass({
  getInitialState: function() {
    return {
      combiName: this.props.combi.name
    };
  },

  handleChange: function(event) {
    this.setState({combiName: event.target.value});
  },

  saveCombi: function(e) {
    e.preventDefault();
    var combi = this.props.combi;
    combi.name = this.state.combiName;
    CombiActions.saveCombi(combi);
  },

  render: function() {
    return (
      <div className="combi-view">
        <div className="header">
          <form onSubmit={this.saveCombi}>
            <input type="text" defaultValue={this.state.combiName} placeholder="Nom de la combinaison" ref="combiName"/>
          </form>

          <div className="pull-right">
            <button onClick={this.saveCombi}>Sauver</button>
            <button onClick={this.removeCombi}>Supprimer</button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Combi;
