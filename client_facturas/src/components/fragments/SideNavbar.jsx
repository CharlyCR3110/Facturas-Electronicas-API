import React from 'react'
import { Link } from 'react-router-dom'

const SideNavbar = ({ currentPage }) => {
  const logout = () => {
    fetch('http://localhost:8080/api/auth/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cerrar sesión')
        } else {
          window.sessionStorage.removeItem('loggedUser')
          window.location.href = 'http://localhost:5173/login'
        }
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error.message)
        window.sessionStorage.clear()
        window.location.href = 'http://localhost:5173/login'
      })
  }

  return (
    <ul className='nav'>
      <div className='left-side-nav-container'>
        <li>
          <div className='side-nav-group-header-label'>
            <span>
              <svg width='16px' height='16px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M4 7L7 7M20 7L11 7' stroke='#1C274C' strokeWidth='1.5' strokeLinecap='round' />
                <path d='M20 17H17M4 17L13 17' stroke='#1C274C' strokeWidth='1.5' strokeLinecap='round' />
                <path d='M4 12H7L20 12' stroke='#1C274C' strokeWidth='1.5' strokeLinecap='round' />
              </svg>
            </span>
            <p>Proveedor</p>
          </div>
          <ul className='menu-group-label'>
            <li>
              <Link to='/account_info' className={currentPage === 'account_info' ? 'active' : ''}>Información de la Cuenta</Link>
            </li>
            <li>
              <Link to='/clients' className={currentPage === 'clients' ? 'active' : ''}>Clientes</Link>
            </li>
            <li>
              <Link to='/products' className={currentPage === 'products' ? 'active' : ''}>Productos</Link>
            </li>
            <li>
              <Link to='/invoice_creator' className={currentPage === 'invoiceCreator' ? 'active' : ''}>Facturar</Link>
            </li>
            <li>
              <Link to='/invoices' className={currentPage === 'invoicesHistory' ? 'active' : ''}>Historial de Facturas</Link>
            </li>
            <li>
              <a onClick={logout}>Cerrar Sesión</a>
            </li>
          </ul>
        </li>
      </div>
    </ul>
  )
}

export default SideNavbar
