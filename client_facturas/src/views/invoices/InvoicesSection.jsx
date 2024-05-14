import React, { useEffect, useState } from 'react'
import LoadingComponent from '../../components/misc/LoadingComponent'
import HeaderComponent from '../../components/fragments/HeaderComponent'
import SideNavbar from '../../components/fragments/SideNavbar'
import { formatInvoices, handleDelete } from './actionHandlers'
import '../../assets/css/global.css'
import '../../assets/css/product-client-invoice-styles.css'
import '../../assets/css/fragments/header.css'
import '../../assets/css/fragments/nav.css'
import TitleComponent from '../../components/pages/TitleComponent'
import SearchComponent from '../../components/pages/SearchComponent'
import TableComponent from '../../components/pages/TableComponent'

const InvoicesSection = () => {
  const getAllInvoicesApiUrl = 'http://localhost:8080/api/invoices/history'

  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false) // todo: change to true
  const [errorMessage, setErrorMessage] = useState('')

  const loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser'))

  if (!loggedUser) {
    window.location.href = 'http://localhost:5173/login'
    console.error('Usuario no autenticado')
  }

  const handleSearch = (searchName) => {
    console.log('Buscando:', searchName)
  }

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(getAllInvoicesApiUrl, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Error al obtener las facturas')
        }

        const data = await response.json()
        const formattedInvoices = formatInvoices(data)
        setInvoices(formattedInvoices)
        setLoading(false)
      } catch (error) {
        console.error('Error al obtener las facturas:', error.message)
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  return (
    <>
      {loading
        ? (
          <LoadingComponent />
          )
        : (
          <>
            <HeaderComponent loggedUser={{ nombre: loggedUser.nombre }} />
            <SideNavbar currentPage='invoicesHistory' />
            <div className='container-container'>
              <div className='container'>
                <TitleComponent title='Facturas' />
                <div className='forms'>
                  <div className='form-inline pull-left' />
                  <div className='form-inline pull-right'>
                    <SearchComponent
                      inputName='searchClientID'
                      inputPlaceHolder='ID del cliente'
                      onSubmit={handleSearch}
                      setErrorMessage={setErrorMessage}
                      setFoundElements={setInvoices}
                    />
                  </div>
                </div>
                <TableComponent
                  headers={['ID Factura', 'Fecha de Emisión', 'ID Cliente', 'Subtotal', 'Impuesto', 'Total']}
                  data={invoices.map(invoice => [invoice.idFactura, invoice.fechaEmision, invoice.idCliente, invoice.subtotal, invoice.impuesto, invoice.total])}
                  handleEdit={null} // una factura no se puede editar
                  handleDelete={handleDelete}
                  handleSendToInvoice={null} // una factura no se envia a una factura, no tiene sentido
                  setErrorMessage={setErrorMessage}
                  popupTitle='Detalles de Factura'
                  popupFields={null} // no hacen falta campos para la factura (estos son los campos de los formulario (editar, agregar, en este caso no se necesita))
                  setCurrentElement={() => {}} // funcion vacia para evitar errores
                  setElements={setInvoices}
                />
              </div>
            </div>
          </>
          )}
    </>
  )
}

export default InvoicesSection
