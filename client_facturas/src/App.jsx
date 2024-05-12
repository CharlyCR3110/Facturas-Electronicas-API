import { useState } from 'react'
import AuthSection from './views/auth/AuthSection'

function App () {
  const [loggedUser, setLoggedUser] = useState(null)

  // logout fetch
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/logout/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${loggedUser.token}`
        }
      })

      if (!response.ok) {
        throw new Error('Cierre de sesión fallido')
      }

      console.log('Cierre de sesión exitoso')
      setLoggedUser(null)
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message)
    }
  }

  // http://localhost:8080/api/products/
  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products/')
      if (!response.ok) {
        throw new Error('Error al obtener los productos')
      }
      const products = await response.json()
      console.log('Productos:', products)
    } catch (error) {
      console.error('Error al obtener los productos:', error.message)
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
