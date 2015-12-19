import React from 'react'

const NavMenu = (props) => {
  return (
    <div className="main-nav">
      {props.children}
    </div>
  )
}

export default NavMenu
