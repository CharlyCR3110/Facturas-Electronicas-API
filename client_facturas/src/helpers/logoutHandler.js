export const logout = () => {
  fetch('http://localhost:8080/api/auth/logout', {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cerrar sesión')
      } else {
        window.sessionStorage.clear()
        window.location.href = 'http://localhost:5173/login'
      }
    })
    .catch(error => {
      console.error('Error al cerrar sesión:', error.message)
      window.sessionStorage.clear()
      window.location.href = 'http://localhost:5173/login'
    })
}
