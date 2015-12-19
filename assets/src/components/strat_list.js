import React from 'react'

const StratList = (props) => {
  let {strats, onDelete, onSelect, selectedStrat} = props

  let combiList = strats.map(strat => {
    let className = "combi-list-item"
    if (strat === selectedStrat)
      className += " selected"

    return (
      <li key={strat.id} className={className}>
        <a className="combi-list-item-name" onClick={onSelect.bind(null, strat)}>
          {strat.name}
        </a>
        <a className="float-right remove" onClick={onDelete.bind(null, strat)}>
          X
        </a>
      </li>
    )
  })

  return (
    <ul className="combi-list">
      {combiList}
    </ul>
  )
}

export default StratList
