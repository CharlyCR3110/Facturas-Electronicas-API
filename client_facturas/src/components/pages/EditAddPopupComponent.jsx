import React, { useRef } from 'react'

const EditAddPopupComponent = ({
  title,
  fields,
  onSubmit,
  handleClosePopup,
  setErrorMessage,
  currentElementId,
  setUpdatedElements
}) => {
  const formRef = useRef(null)
  const textOnButton = currentElementId ? 'Editar' : 'Agregar'

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = Array.from(formRef.current.elements).reduce((acc, field) => {
      if (field.name) {
        acc[field.name] = field.value
      }
      return acc
    }, {})
    onSubmit(currentElementId, formData, setErrorMessage, setUpdatedElements, handleClosePopup)
  }

  return (
    <div className='edit-popup'>
      <div className='popup-content'>
        <div className='popup-header'>
          <h2>{title}</h2>
        </div>
        <div className='popup-body'>
          <form ref={formRef} onSubmit={(event) => handleSubmit(event)}>
            {fields.map((field) => (
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
            <button className='action-btn'>
              {textOnButton}
            </button>
          </form>
          <button className='cancel-btn' onClick={handleClosePopup}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditAddPopupComponent
