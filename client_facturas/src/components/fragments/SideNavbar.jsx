import React from 'react'

const SideNavbar = ({ currentPage }) => {
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
              <a href='/account_info' className={currentPage === 'account_info' ? 'active' : ''}>Información de la Cuenta</a>
            </li>
            <li>
              <a href='/clients' className={currentPage === 'clients' ? 'active' : ''}>Clientes</a>
            </li>
            <li>
              <a href='/products' className={currentPage === 'products' ? 'active' : ''}>Productos</a>
            </li>
            <li>
              <a href='/invoice_creator' className={currentPage === 'invoiceCreator' ? 'active' : ''}>Facturar</a>
            </li>
            <li>
              <a href='/invoices/history' className={currentPage === 'invoicesHistory' ? 'active' : ''}>Historial de Facturas</a>
            </li>
            <li>
              <a href='/logout'>Cerrar Sesión</a>
            </li>
          </ul>
        </li>
      </div>
    </ul>
  )
}

export default SideNavbar
