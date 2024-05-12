import React from 'react'
import '../../assets/css/errors/error_popup.css'

const ErrorComponent = ({ error, onClose }) => {
  return (
    <div className='error-overlay'>
      <div className='error-popup'>
        <label htmlFor='errorToggle' className='close-btn' onClick={onClose}>&times;</label>
        <p className='error-message'>{error}</p>
      </div>
    </div>
  )
}

export default ErrorComponent
