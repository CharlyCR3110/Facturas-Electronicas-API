const API_URL_LOGIN = 'http://localhost:8080/api/auth/login'

export const onLoginSubmit = async (event, formData, setErrorMessage) => {
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
      throw new Error('Inicio de sesión fallido')
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
    console.error('Error al iniciar sesión:', error.message)
    setErrorMessage(error.message)
  }
}
