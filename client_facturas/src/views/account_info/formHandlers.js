// localhost:8080/api/providers/account/change-password?currentPassword=123&newPassword=1234&confirmPassword=1234
export const handlePasswordChangeFormSubmit = async (formData, setFormData, setConfirmation) => {
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
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error.message)
  }
}
