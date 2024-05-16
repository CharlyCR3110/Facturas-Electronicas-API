import React from 'react'
import '../../assets/css/errors/popup.css'

const PopupComponent = ({ message, onClose, type }) => {
  const popupClass = type === 'confirmation' ? 'confirmation' : 'error'

  return (
    <div className='overlay'>
      <div className={`popup ${popupClass}`}>
        <label htmlFor='toggle' className='close-btn' onClick={onClose}>&times;</label>
        <p className='message'>{message}</p>
      </div>
    </div>
  )
}

export default PopupComponent
