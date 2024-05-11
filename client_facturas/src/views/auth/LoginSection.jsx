import AuthComponent from '../../components/auth/AuthComponent'
import { useState, useEffect } from 'react'

const LoginSection = ({ sectionName }) => {
  const [formData, setFormData] = useState({})
  const fields = [
    { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Ej. name@example.com' },
    { name: 'contrasena', label: 'Contraseña', type: 'password', placeholder: 'Ej. ********' }
  ]

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return AuthComponent({ formData, setFormData, onSubmit, fields, sectionName })
}

export default LoginSection
