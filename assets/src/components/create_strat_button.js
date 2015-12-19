import React from 'react'

const CreateStratButton = React.createClass({
  propTypes: {
    onSave: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {isModalOpen: false}
  },

  handleOpenModalClick(e) {
    e.preventDefault()
    this.setState({isModalOpen: true})
  },

  handleCreateStratSubmit(e) {
    e.preventDefault()
    let name = e.target.name.value
    this.props.onSave({name})
    this.setState({isModalOpen: false})
  },

  render() {
    if (this.state.isModalOpen) {
      return (
        <form onSubmit={this.handleCreateStratSubmit} className="create-strat-wrapper">
          <input type="text" name="name" placeholder="strategie name" />
          <input type="submit" value="ok" className="btn btn-primary" />
        </form>
      )
    } else {
      return (
        <div className="create-strat-wrapper">
          <a onClick={this.handleOpenModalClick} className="btn btn-primary btn-large">
            New
          </a>
        </div>
      )
    }
  }
})

export default CreateStratButton
