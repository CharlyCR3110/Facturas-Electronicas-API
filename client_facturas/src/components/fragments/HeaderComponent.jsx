import React from 'react'

const HeaderComponent = ({ loggedUser }) => {
  return (
    <div className='header-wrapper'>
      <div id='minimal-header'>
        <div className='right-header'>
          <div className='header-btn'>
            <a href='/account_info'>{loggedUser.nombre}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent
