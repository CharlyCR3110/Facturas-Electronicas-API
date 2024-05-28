import { useState } from 'react'
import AuthComponent from '../../components/auth/AuthComponent'
import { onLoginSubmit } from './formsHandler'

const LoginSection = ({ sectionName }) => {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const fields = [
    { name: 'correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Ej. name@example.com' },
    { name: 'contrasena', label: 'Contraseña', type: 'password', placeholder: 'Ej. ********' }
  ]

  return (
    <>
      <title>{sectionName}</title>
      <AuthComponent
        formData={formData}
        setFormData={setFormData}
        onSubmit={onLoginSubmit}
        fields={fields}
        sectionName={sectionName}
        isRegisterSuccess={false}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  )
}

export default LoginSection
