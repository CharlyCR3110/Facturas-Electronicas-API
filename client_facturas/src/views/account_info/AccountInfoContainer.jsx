import React, { useState } from 'react'
import AccountInfoForm from '../../components/account_info/AccountInfoForm'
import HeaderComponent from '../../components/fragments/HeaderComponent'
import SideNavbar from '../../components/fragments/SideNavbar'
import '../../assets/css/global.css'
import '../../assets/css/account_info.css'
import '../../assets/css/fragments/header.css'
import '../../assets/css/fragments/nav.css'

const AccountInfoContainer = () => {
  const [confirmation, setConfirmation] = useState(false)

  const handleFormSubmit = (formData) => {
    // Aquí puedes manejar el envío del formulario
    console.log('Datos del formulario:', formData)
    // Simulación de confirmación
    setConfirmation(true)
  }

  const loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser'))

  if (!loggedUser) {
    window.location.href = 'http://localhost:5173/login'
    console.error('Usuario no autenticado')
  }

  console.log('Usuario autenticado:', loggedUser)

  return (
    <>
      <HeaderComponent loggedUser={{ nombre: loggedUser.nombre }} />
      <SideNavbar currentPage='account_info' />
      <div className='account-info-container'>
        <section className='account-info'>
          <h2>Información de la Cuenta</h2>

          <AccountInfoForm
            title='Correo'
            onSubmit={handleFormSubmit}
            fields={[
              { name: 'correo', type: 'email', placeholder: 'Correo', label: 'Cambiar Correo' }
            ]}
          />

          <AccountInfoForm
            title='Contraseña'
            onSubmit={handleFormSubmit}
            fields={[
              { name: 'currentPassword', type: 'password', placeholder: 'Contraseña actual', label: 'Contraseña Actual' },
              { name: 'newPassword', type: 'password', placeholder: 'Contraseña nueva', label: 'Nueva Contraseña' },
              { name: 'confirmPassword', type: 'password', placeholder: 'Confirmar contraseña', label: 'Confirmar Contraseña' }
            ]}
          />

          <AccountInfoForm
            title='Datos del Proveedor'
            onSubmit={handleFormSubmit}
            fields={[
              { name: 'nombre', type: 'text', placeholder: 'Nombre', label: 'Nombre', value: loggedUser.nombre },
              { name: 'direccion', type: 'text', placeholder: 'Dirección', label: 'Dirección', value: loggedUser.direccion },
              { name: 'telefono', type: 'text', placeholder: 'Teléfono', label: 'Teléfono', value: loggedUser.telefono }
            ]}
          />
        </section>
      </div>
    </>
  )
}

export default AccountInfoContainer
