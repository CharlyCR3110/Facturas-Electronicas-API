import React, { useState } from 'react'
import AccountInfoForm from '../../components/account_info/AccountInfoForm'
import HeaderComponent from '../../components/fragments/HeaderComponent'
import SideNavbar from '../../components/fragments/SideNavbar'
import PopupComponent from '../../components/popups/PopupComponent'
import { handlePasswordChangeFormSubmit, handleEmailChangeFormSubmit, handlePersonalInfoChangeFormSubmit } from './formHandlers' // Importar las funciones
import '../../assets/css/global.css'
import '../../assets/css/account_info.css'
import '../../assets/css/fragments/header.css'
import '../../assets/css/fragments/nav.css'

const AccountInfoSection = () => {
  const [confirmationMessage, setConfirmationMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const changeEmailField = [
    { name: 'email', type: 'email', placeholder: 'proveedora@example.com', label: 'Correo Electrónico' }
  ]

  const changePasswordFields = [
    { name: 'currentPassword', type: 'password', placeholder: 'Contraseña actual', label: 'Contraseña Actual' },
    { name: 'newPassword', type: 'password', placeholder: 'Contraseña nueva', label: 'Nueva Contraseña' },
    { name: 'confirmPassword', type: 'password', placeholder: 'Confirmar contraseña', label: 'Confirmar Contraseña' }
  ]

  const loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser'))

  if (!loggedUser) {
    window.location.href = 'http://localhost:5173/login'
    console.error('Usuario no autenticado')
  }

  const changePersonalInfoFields = [
    { name: 'nombre', type: 'text', placeholder: 'Nombre', label: 'Nombre', value: loggedUser.nombre },
    { name: 'direccion', type: 'text', placeholder: 'Dirección', label: 'Dirección', value: loggedUser.direccion },
    { name: 'telefono', type: 'text', placeholder: 'Teléfono', label: 'Teléfono', value: loggedUser.telefono }
  ]

  return (
    <>
      <HeaderComponent loggedUser={{ nombre: loggedUser.nombre }} />
      <SideNavbar currentPage='account_info' />
      <div className='account-info-container'>
        <section className='account-info'>
          <h2>Información de la Cuenta</h2>

          <AccountInfoForm
            title='Correo'
            onSubmit={handleEmailChangeFormSubmit}
            fields={changeEmailField}
            setConfirmationMessage={setConfirmationMessage}
            setErrorMessage={setErrorMessage}
          />

          <AccountInfoForm
            title='Contraseña'
            onSubmit={handlePasswordChangeFormSubmit}
            fields={changePasswordFields}
            setConfirmationMessage={setConfirmationMessage}
            setErrorMessage={setErrorMessage}
          />

          <AccountInfoForm
            title='Datos del Proveedor'
            onSubmit={handlePersonalInfoChangeFormSubmit}
            fields={changePersonalInfoFields}
            setConfirmationMessage={setConfirmationMessage}
            setErrorMessage={setErrorMessage}
          />
        </section>
        {confirmationMessage && <PopupComponent message={confirmationMessage} onClose={() => setConfirmationMessage('')} type='confirmation' />}
        {errorMessage && <PopupComponent message={errorMessage} onClose={() => setErrorMessage('')} type='error' />}
      </div>

    </>
  )
}

export default AccountInfoSection
