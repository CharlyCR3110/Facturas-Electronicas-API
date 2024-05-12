import { useState } from 'react'
import AuthSection from './views/auth/AuthSection'

function App () {
  const [loggedUser, setLoggedUser] = useState(null)

  // logout fetch
  // estoy trabajando con cookies (JSessionId)
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'GET',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Error al cerrar sesión')
      }

      setLoggedUser(null)
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message)
    }
  }

  // get products fetch
  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products/', {
        method: 'GET',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Error al obtener productos')
      }

      const products = await response.json()
      console.log('Productos:', products)
    } catch (error) {
      console.error('Error al obtener productos:', error.message)
    }
  }

  if (loggedUser) {
    return (
      <div className='App'>
        <h1>Bienvenido {loggedUser.nombre}</h1>
        <button onClick={getProducts}>Obtener Productos</button>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
    )
  }

  return (
    <div className='App'>
      <AuthSection setLoggedUser={setLoggedUser} />
    </div>
  )
}

export default App
