import React from 'react'
import Firebase from 'firebase'
import StratList from '../components/strat_list'
import StratPlayer from '../components/strat_player'
import NavMenu from '../components/nav_menu'
import CreateStratButton from '../components/create_strat_button'

const stratsStore = new Firebase('https://hand-strat.firebaseio.com/combis');

const StratContainer = React.createClass({
  getInitialState() {
    return {
      strats: [],
      selectedStrat: null
    }
  },

  componentWillMount() {
    stratsStore.on('value', this.storeChanged);
  },

  storeChanged(snapshot) {
    var objectList = snapshot.val()
    if (objectList === null || objectList === undefined) return
    var keys = Object.keys(objectList)
    var strats = keys.reduce(function(strats, key) {
      strats.push(Object.assign({}, {id: key}, objectList[key]))
      return strats
    }, [])
    this.setState({strats})
  },

  selectStrat(strat) {
    this.setState({selectedStrat: strat})
  },

  saveStrat(strat) {
    stratsStore.push(strat)
  },

  deleteStrat(strat) {
    stratsStore.child(strat.id).remove()
  },

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Hand Strategie</h1>
        </div>
        <div className="content">
          <NavMenu>
            <CreateStratButton onSave={this.saveStrat} />
            <StratList strats={this.state.strats}
              onDelete={this.deleteStrat}
              onSelect={this.selectStrat}
              selectedStrat={this.state.selectedStrat} />
          </NavMenu>
          <StratPlayer strat={this.state.selectedStrat}
            onSave={this.saveStrat} />
        </div>
      </div>
    )
  }

})

export default StratContainer
