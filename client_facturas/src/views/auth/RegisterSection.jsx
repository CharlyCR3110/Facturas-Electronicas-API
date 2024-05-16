import AuthComponent from '../../components/auth/AuthComponent'
import { useState } from 'react'

const API_URL_REGISTER = 'http://localhost:8080/api/auth/register'

const RegisterSection = ({ sectionName }) => {
  const [formData, setFormData] = useState({})
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Ej. Juan' },
    { name: 'direccion', label: 'Dirección', type: 'text', placeholder: 'Ej. Calle 123' },
    { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: 'Ej. 1234567890' },
    { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Ej. name@example.com' },
    { name: 'contrasena', label: 'Contraseña', type: 'password', placeholder: 'Ej. ********' }
  ]

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(API_URL_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.status === 409) {
        throw new Error('El correo ya está registrado')
      } else if (!response.ok) {
        throw new Error('Error al registrar el usuario')
      }

      const user = await response.json()

      console.log('Usuario registrado', user)

      // Limpiar el formulario
      setFormData({})

      // Mostrar mensaje de éxito
      setIsRegisterSuccess(true)
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message)
      setErrorMessage(error.message)
    }
  }

  return AuthComponent({ formData, setFormData, onSubmit, fields, sectionName, isRegisterSuccess, errorMessage, setErrorMessage })
}

export default RegisterSection
