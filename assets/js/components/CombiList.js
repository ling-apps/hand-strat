/** @jsx React.DOM */
var React = require('react');

var CombiStore = require('../stores/Combis');

function getState() {
  return {
    combis: CombiStore.getAll(),
    searching: false
  };
}

var CombiList = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    this._changeListener = function() { this.setState(getState()); }.bind(this);
    CombiStore.addChangeListener(this._changeListener);
  },

  componentWillUnmount: function() {
    CombiStore.removeChangeListener(this._changeListener);
    this._changeListener = null;
  },

  onSearchClick: function() {
    this.setState({ searching: true });
  },
  onCancelSearch: function() {
    this.setState({ searching: false });
  },

  render: function() {
    var combis = [];
    this.state.combis.map(function(combi, index) {
      combis.push(
        <div key={index} onClick={this.props.onCombiSelect.bind(null, combi)} className="combi-list-item">{combi.name}</div>
      );
    }.bind(this));
    return (
      <div className="sidebar">
        {this.state.searching ?
          <div className="header">
            <input type="text" ref="searchField" placeholder="Search" />
            <span className="actions">
              <span className="icon-cancel" onClick={this.onCancelSearch}>Cancel</span>
            </span>
          </div>
        :
          <div className="header">
            <h2>Combis</h2>
            <span className="actions">
              <span className="icon-search" onClick={this.onSearchClick}>Search</span>
            </span>
          </div>
        }

        <div className="combi-list">
          {combis}
        </div>
      </div>
    );
  }

});

module.exports = CombiList;
