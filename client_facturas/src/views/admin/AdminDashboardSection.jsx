import React, { useState } from 'react'
import { logout } from '../../helpers/logoutHandler'
import TableComponent from '../../components/pages/TableComponent'

const AdminDashboardSection = () => {
  const [providers, setProvidersList] = useState([])
  const headers = ['Identificación', 'Nombre', 'Teléfono', 'Correo', 'Direccion', 'Estado']
  return (
    <>
      <div className='admin-logout-btn'>
        <button onClick={logout} className='logout-btn' />
      </div>
      <div className='container'>
        <h1>Dashboard</h1>
        <p>TABLE AQUI...</p>
      </div>
    </>
  )
}

export default AdminDashboardSection
// TableComponent
// headers, data, handleEdit, handleDelete, handleSendToInvoice, setErrorMessage, popupTitle, popupFields, setCurrentElement, setElements, handleExport
