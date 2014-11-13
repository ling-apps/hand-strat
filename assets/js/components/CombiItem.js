/** @jsx React.DOM */
var React = require('react');

var CombiActions = require('../actions/CombiActions');
var CombiDrawer= require('./CombiDrawer');

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

  removeCombi: function(e) {
    e.preventDefault();
    var combi = this.props.combi;
    combiId = combi.id;
    CombiActions.removeCombi(combiId);
  },

  render: function() {
    return (
      <div className="combi-view">
        <div className="header">
          <form onSubmit={this.saveCombi}>
            <input type="text" value={this.state.combiName} placeholder="Nom de la combinaison" onChange={this.handleChange}/>
          </form>

          <div className="pull-right">
            <button onClick={this.saveCombi}>Sauver</button>
            <button onClick={this.removeCombi}>Supprimer</button>
          </div>
        </div>
        <div className="content">
          <CombiDrawer combi={this.props.combi} />
        </div>
      </div>
    );
  }

});

module.exports = Combi;
