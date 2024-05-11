import AuthComponent from '../../components/auth/AuthComponent'
import { useState, useEffect } from 'react'

const RegisterSection = ({ sectionName }) => {
  const [formData, setFormData] = useState({})
  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Ej. Juan' },
    { name: 'direccion', label: 'Dirección', type: 'text', placeholder: 'Ej. Calle 123' },
    { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: 'Ej. 1234567890' },
    { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Ej. name@example.com' },
    { name: 'contrasena', label: 'Contraseña', type: 'password', placeholder: 'Ej. ********' }
  ]

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return AuthComponent({ formData, setFormData, onSubmit, fields, sectionName })
}

export default RegisterSection
