import AuthComponent from '../../components/auth/AuthComponent'
import { useState } from 'react'

const API_URL_LOGIN = 'http://localhost:8080/api/auth/login'

const LoginSection = ({ sectionName, setLoggedUser }) => {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const fields = [
    { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Ej. name@example.com' },
    { name: 'contrasena', label: 'Contraseña', type: 'password', placeholder: 'Ej. ********' }
  ]

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(API_URL_LOGIN, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Inicio de sesión fallido')
      }

      const user = await response.json()
      console.log('Usuario autenticado:', user)

      setLoggedUser(user) // Establecer el usuario autenticado en el estado
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message)
      setErrorMessage(error.message)
    }
  }

  return AuthComponent({ formData, setFormData, onSubmit, fields, sectionName, isRegisterSuccess: false, errorMessage, setErrorMessage })
}

export default LoginSection
