import AuthComponent from '../../components/auth/AuthComponent'
import { useState, useEffect } from 'react'

const API_URL_REGISTER = 'http://localhost:8080/api/auth/register'

const RegisterSection = ({ sectionName }) => {
  const [formData, setFormData] = useState({})
  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Ej. Juan' },
    { name: 'direccion', label: 'Dirección', type: 'text', placeholder: 'Ej. Calle 123' },
    { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: 'Ej. 1234567890' },
    { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Ej. name@example.com' },
    { name: 'contrasena', label: 'Contraseña', type: 'password', placeholder: 'Ej. ********' }
  ]

  // {
  //   "nombre": "Proveedor API_TEST",
  //   "direccion": "Calle Principal 123",
  //   "telefono": "555-12343",
  //   "correo": "proveedor_api_01@example.com",
  //   "contrasena": "123"
  // }

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
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message)
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  }

  return AuthComponent({ formData, setFormData, onSubmit, fields, sectionName })
}

export default RegisterSection
