import AuthComponent from '../../components/auth/AuthComponent'
import { useState } from 'react'

const API_URL_LOGIN = 'http://localhost:8080/api/auth/login'

const LoginSection = ({ sectionName, setLoggedUser }) => {
  const [formData, setFormData] = useState({})
  const fields = [
    { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Ej. name@example.com' },
    { name: 'contrasena', label: 'Contraseña', type: 'password', placeholder: 'Ej. ********' }
  ]

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(API_URL_LOGIN, {
        method: 'POST',
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
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  }

  return AuthComponent({ formData, setFormData, onSubmit, fields, sectionName })
}

export default LoginSection
