import React, { useEffect, useState } from 'react'
import TitleComponent from '../../components/pages/TitleComponent'
import TableComponent from '../../components/pages/TableComponent'
import HeaderComponent from '../../components/fragments/HeaderComponent'
import SideNavbar from '../../components/fragments/SideNavbar'
import PopupComponent from '../../components/popups/PopupComponent'
import EditAddPopupComponent from '../../components/pages/EditAddPopupComponent'
import SearchComponent from '../../components/pages/SearchComponent'
import { handleDelete, handleEdit, handleAdd, handleSearch } from './actionHandlers'
import '../../assets/css/global.css'
import '../../assets/css/product-client-invoice-styles.css'
import '../../assets/css/fragments/header.css'
import '../../assets/css/fragments/nav.css'

const ClientsSections = () => {
  const getAllProductsApiUrl = 'http://localhost:8080/api/clients/'
  // Estado para almacenar los clientes
  const [clients, setClients] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [showAddPopup, setShowAddPopup] = useState(false)

  const loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser'))

  if (!loggedUser) {
    window.location.href = 'http://localhost:5173/login'
    console.error('Usuario no autenticado')
  }

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(getAllProductsApiUrl, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Error al obtener los clientes')
        }

        const data = await response.json()
        setClients(data)
        setLoading(false)
      } catch (error) {
        console.error('Error al obtener los clientes:', error.message)
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  const currentClientName = currentProduct ? currentProduct[1] : ''
  const currentClientIdentification = currentProduct ? currentProduct[2] : ''
  const currentClientPhone = currentProduct ? currentProduct[3] : ''
  const currentClientEmail = currentProduct ? currentProduct[4] : ''

  const popupHeaders = ['Id Cliente', 'Nombre', 'Identificacion', 'Teléfono', 'Correo']

  const popupFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', value: currentClientName },
    { name: 'identificacion', label: 'Identificacion', type: 'text', value: currentClientIdentification },
    { name: 'telefono', label: 'Télefono', type: 'text', value: currentClientPhone },
    { name: 'correo', label: 'Correo', type: 'email', value: currentClientEmail }
  ]

  const addPopupFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', value: '' },
    { name: 'identificacion', label: 'Identificacion', type: 'text', value: '' },
    { name: 'telefono', label: 'Télefono', type: 'text', value: '' },
    { name: 'correo', label: 'Correo', type: 'email', value: '' }
  ]

  return (
    <>
      {loading
        ? <p>Cargando clientes...</p>
        : (
          <>
            <HeaderComponent loggedUser={{ nombre: loggedUser.nombre }} />
            <SideNavbar currentPage='clients' />
            <div className='container-container'>
              <div className='container'>
                <TitleComponent title='Clientes' />
                <div className='forms'>
                  <div className='form-inline pull-left'>
                    <button className='action-btn' onClick={() => setShowAddPopup(true)}>Agregar Cliente</button>
                    {showAddPopup && (
                      <EditAddPopupComponent
                        title='Agregar Cliente'
                        fields={addPopupFields}
                        onSubmit={handleAdd}
                        handleClosePopup={() => setShowAddPopup(false)}
                        setErrorMessage={setErrorMessage}
                        currentElementId={null}
                        setUpdatedElements={setClients}
                      />
                    )}
                  </div>
                  <div className='form-inline pull-right'>
                    <SearchComponent
                      inputName='searchName'
                      inputPlaceHolder='Nombre del cliente'
                      onSubmit={handleSearch}
                      setErrorMessage={setErrorMessage}
                      setFoundElements={setClients}
                    />
                  </div>
                </div>
                <TableComponent
                  headers={popupHeaders}
                  data={clients.map(client => [client.idCliente, client.nombre, client.identificacion, client.telefono, client.correo])}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleSendToInvoice={client => console.log(client)}
                  setErrorMessage={setErrorMessage}
                  popupTitle='Editar Producto'
                  popupFields={popupFields}
                  setCurrentElement={setCurrentProduct}
                  setElements={setClients}
                />
              </div>
            </div>
          </>
          )}
      {errorMessage && <PopupComponent message={errorMessage} onClose={() => setErrorMessage('')} type='error' />}
    </>
  )
}

export default ClientsSections
