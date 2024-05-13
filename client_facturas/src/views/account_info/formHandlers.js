export const handlePasswordChangeFormSubmit = async (formData, setFormData, setConfirmationMessage, setErrorMessage) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = formData

    console.log('currentPassword:', currentPassword)
    console.log('newPassword:', newPassword)
    console.log('confirmPassword:', confirmPassword)

    if (newPassword !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden')
    }

    const response = await fetch(`http://localhost:8080/api/providers/account/change-password?currentPassword=${currentPassword}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/text'
      }
    })

    if (!response.ok) {
      throw new Error('Error al cambiar la contraseña')
    }

    // expected: Contraseña actualizada correctamente
    const data = await response.text()

    console.log('Respuesta del servidor:', data)

    // Limpiar los campos del formulario
    setFormData({})

    // confirmar el cambio
    setConfirmationMessage('Contraseña actualizada correctamente')
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error.message)
    setErrorMessage(error.message)
  }
}
// http://localhost:8080/api/providers/account/change-email?idProveedor=1&newEmail="newemail@example.com"

export const handleEmailChangeFormSubmit = async (formData, setFormData, setConfirmation, setErrorMessage) => {
  const userLogged = JSON.parse(window.sessionStorage.getItem('loggedUser'))
  const userLoggedId = userLogged.idUsuario
  userLogged.correo = formData.correo

  console.log('Usuario logueado:', userLogged)

  try {
    const response = await fetch(`http://localhost:8080/api/providers/account/change-email?idProveedor=${userLoggedId}&newEmail=${formData.email}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al cambiar el correo')
    }

    // expected: updated json object
    const data = await response.json()
    console.log('Respuesta del servidor:', data)

    // Actualizar el usuario logueado
    window.sessionStorage.setItem('loggedUser', JSON.stringify(data))

    // Limpiar los campos del formulario
    setFormData({})

    // confirmar el cambio
    setConfirmation('Correo actualizado correctamente')
  } catch (error) {
    console.error('Error al cambiar el correo:', error.message)
    setErrorMessage(error.message)
  }
}
