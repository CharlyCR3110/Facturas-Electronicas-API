import React, { useEffect, useState } from 'react'
import { logout } from '../../helpers/logoutHandler'
import { fetchProviders, handleChangeStatus } from './actionHandlers'
import TableComponent from '../../components/pages/TableComponent'

const AdminDashboardSection = () => {
  const [providers, setProvidersList] = useState([])
  const headers = ['Identificación', 'Nombre', 'Teléfono', 'Correo', 'Direccion', 'Estado']

  useEffect(() => {
    fetchProviders(setProvidersList)
  }, [])

  return (
    <>
      <div className='admin-logout-btn'>
        <button onClick={logout} className='logout-btn' />
      </div>
      <div className='container'>
        <h1>Dashboard</h1>
        <TableComponent
          headers={headers}
          data={providers.map(provider => [provider.idUsuario, provider.nombre, provider.direccion, provider.telefono, provider.correo, provider.estado])}
          handleEdit={null}
          handleDelete={null}
          handleSendToInvoice={null}
          setErrorMessage={null}
          popupTitle='Administrar Proveedor'
          popupFields={null}
          setCurrentElement={null}
          setElements={setProvidersList}
          handleChangeStatus={handleChangeStatus}
        />
      </div>
    </>
  )
}

export default AdminDashboardSection
