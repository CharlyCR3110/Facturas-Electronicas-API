import React from 'react'

const EditAddPopupComponent = ({ title, fields, onSubmit, handleClosePopup, setErrorMessage, currentElementId, setUpdatedElements }) => {
  return (
    <div className='edit-popup'>
      <div className='popup-content'>
        <div className='popup-header'>
          <h2>{title}</h2>
        </div>
        <div className='popup-body'>
          <form>
            {fields.map(field => (
              <div className='form-group' key={field.name}>
                <label htmlFor={`${field.name}-edit`}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  id={`${field.name}-edit`}
                  defaultValue={field.value}
                  required
                />
              </div>
            ))}
          </form>
          <button
            className='action-btn' onClick={() => {
              const formData = fields.reduce((acc, field) => ({ ...acc, [field.name]: document.getElementById(`${field.name}-edit`).value }), {})
              onSubmit(currentElementId, formData, setErrorMessage, setUpdatedElements, handleClosePopup)
            }}
          >Actualizar
          </button>
          <button className='cancel-btn' onClick={handleClosePopup}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default EditAddPopupComponent
