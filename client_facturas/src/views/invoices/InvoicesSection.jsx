import React, { useEffect, useState } from 'react'
import LoadingComponent from '../../components/misc/LoadingComponent'
import HeaderComponent from '../../components/fragments/HeaderComponent'
import SideNavbar from '../../components/fragments/SideNavbar'
import { handleDelete, fetchUpdatedInvoices, handleSearch } from './actionHandlers'
import '../../assets/css/global.css'
import '../../assets/css/product-client-invoice-styles.css'
import '../../assets/css/fragments/header.css'
import '../../assets/css/fragments/nav.css'
import TitleComponent from '../../components/pages/TitleComponent'
import SearchComponent from '../../components/pages/SearchComponent'
import TableComponent from '../../components/pages/TableComponent'
import PopupComponent from '../../components/popups/PopupComponent'

const InvoicesSection = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true) // todo: change to true
  const [errorMessage, setErrorMessage] = useState('')

  const loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser'))

  if (!loggedUser) {
    window.location.href = 'http://localhost:5173/login'
    console.error('Usuario no autenticado')
  }

  useEffect(() => {
    setLoading(true)
    fetchUpdatedInvoices(setInvoices).then(() => setLoading(false))
  }, [])

  return (
    <>
      <title>Historial de Facturas</title>
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
      {errorMessage && <PopupComponent message={errorMessage} onClose={() => setErrorMessage('')} type='error' />}
    </>
  )
}

export default InvoicesSection
