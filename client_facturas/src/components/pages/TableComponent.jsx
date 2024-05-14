import React, { useState } from 'react'
import EditAddPopupComponent from './EditAddPopupComponent'
import InvoiceDetailsPopupComponent from './InvoiceDetailsPopupComponent'
import ExportPopupComponent from './ExportPopupComponent'
import { fetchDetailsInvoiceInfo } from './tableHelper'

const TableComponent = ({ headers, data, handleEdit, handleDelete, handleSendToInvoice, setErrorMessage, popupTitle, popupFields, setCurrentElement, setElements, handleExport }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [showExportPopup, setShowExportPopup] = useState(false)
  const [currentElementId, setCurrentElementId] = useState('')
  const [currentElement, setLocalCurrentElement] = useState(null)

  const handleShowPopup = (row) => {
    setCurrentElement(row)
    setCurrentElementId(row[0])
    setShowPopup(true)
  }

  const handleShowDetailsPopup = (row) => {
    fetchDetailsInvoiceInfo(row)
      .then(factura => {
        setLocalCurrentElement(factura)
        setCurrentElement(factura)
        setShowPopup(true)
      })
  }

  const handleShowExportPopup = (row) => {
    setCurrentElement(row)
    setCurrentElementId(row[0])
    setShowExportPopup(true)
  }

  const handleClosePopup = () => { setShowPopup(false) }

  const isEditAvailable = popupTitle.includes('Editar')

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
              <td>
                {isEditAvailable
                  ? (
                    <>
                      <button id='edit_button' className='toggle-popup toggle-edit-popup action-btn' onClick={() => handleShowPopup(row)}>Editar</button>
                      <button id='delete_button' className='action-btn' onClick={() => handleDelete(row, setErrorMessage, setElements)}>Eliminar</button>
                      <button id='to_invoice_button' className='action-btn' onClick={() => handleSendToInvoice(row, setErrorMessage)}>Enviar a Factura</button>
                    </>
                    )
                  : (
                    <>
                      <button id='expand_button' className='toggle-popup toggle-edit-popup action-btn' onClick={() => handleShowDetailsPopup(row)}>Expandir</button>
                      <button id='delete_button' className='action-btn' onClick={() => handleDelete(row, setErrorMessage, setElements)}>Eliminar</button>
                      <button id='export_button' className='action-btn' onClick={() => handleShowExportPopup(row)}>Exportar</button>
                    </>
                    )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditAvailable
        ? (
            showPopup
              ? (
                <EditAddPopupComponent
                  title={popupTitle}
                  fields={popupFields}
                  onSubmit={handleEdit}
                  handleClosePopup={handleClosePopup}
                  setErrorMessage={setErrorMessage}
                  currentElementId={currentElementId}
                  setUpdatedElements={setElements}
                />
                )
              : null
          )
        : (
            showPopup
              ? (
                <InvoiceDetailsPopupComponent factura={currentElement} handleClosePopup={handleClosePopup} />
                )
              : (
                  null
                )
          )}
      {showExportPopup && <ExportPopupComponent handleClosePopup={() => setShowExportPopup(false)} setErrorMessage={setErrorMessage} invoiceId={currentElementId} />}
    </>
  )
}

export default TableComponent
// InvoiceDetailsPopupComponent = ({ factura, handleClosePopup })
