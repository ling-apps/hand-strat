import React from 'react'
import ReactDOM from 'react-dom'

const StratPlayer = React.createClass({
  componentDidMount() {
    let element = ReactDOM.findDOMNode(this)
    let width = element.offsetWidth - 5
    let height = element.offsetHeight - 5
    this.refs.canvas.style.width = `${width}px`
    this.refs.canvas.style.height = `${height}px`
  },

  render() {
    return (
      <div className="strat-player-wrapper">
        <canvas ref="canvas" id="strat-player" />
      </div>
    )
  }
})

export default StratPlayer
