const API_URL_LOGIN = 'http://localhost:8080/api/auth/login'
const API_URL_REGISTER = 'http://localhost:8080/api/auth/register'

// se agregan los parametros setFormData y setIsRegisterSuccess, pero no se utilizan solo se agregan para que no haya errores
export const onLoginSubmit = async (event, formData, setErrorMessage, setFormData, setIsRegisterSuccess) => {
  event.preventDefault()
  try {
    const response = await fetch(API_URL_LOGIN, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    // TODO: manejar errores de autenticación
    if (!response.ok) {
      const errorMessage = await response.text()

      throw new Error(errorMessage || 'Error al iniciar sesión')
    }

    const user = await response.json()

    if (user.rol === 'proveedor') {
      window.sessionStorage.setItem('loggedUser', JSON.stringify(user))
      window.location.href = 'http://localhost:5173/account_info'
    } else if (user.rol === 'admin') {
      window.sessionStorage.setItem('loggedAdmin', JSON.stringify(user))
      window.location.href = 'http://localhost:5173/admin/dashboard'
    }
  } catch (error) {
    setErrorMessage(error.message)
  }
}

export const onRegisterSubmit = async (event, formData, setErrorMessage, setFormData, setIsRegisterSuccess) => {
  event.preventDefault()
  try {
    const response = await fetch(API_URL_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      const errorMessage = await response.text()

      throw new Error(errorMessage || 'Error al registrar usuario')
    }
    // Limpiar el formulario
    setFormData({})
    // Mostrar mensaje de éxito
    setIsRegisterSuccess(true)
  } catch (error) {
    setErrorMessage(error.message)
  }
}
