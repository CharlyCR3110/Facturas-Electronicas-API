import React, { useState, useEffect } from 'react'

function AccountInfoForm ({ title, onSubmit, fields, setConfirmation }) {
  const [formData, setFormData] = useState({})

  // Actualiza el formData cuando fields cambie
  useEffect(() => {
    const initialFormData = {}
    fields.forEach(field => {
      initialFormData[field.name] = field.value || ''
    })
    setFormData(initialFormData)
  }, [fields])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData, setFormData, setConfirmation)
  }

  return (
    <div className='account-info-form'>
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              className='rounded'
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <input className='btn btn-primary' name='submit' type='submit' value='Guardar Cambios' />
      </form>
    </div>
  )
}

export default AccountInfoForm
