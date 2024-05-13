import React, { useState } from 'react'
import EditPopupComponent from './EditPopupComponent'

const TableComponent = ({ headers, data, handleEdit, handleDelete, handleSendToInvoice, setErrorMessage, popupTitle, popupFields, setCurrentElement, setProducts }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [currentElementId, setCurrentElementId] = useState('')

  const handleShowPopup = (row) => {
    setCurrentElement(row)
    setCurrentElementId(row[0])
    setShowPopup(true)
  }
  const handleClosePopup = () => { setShowPopup(false) }

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
                <button id='edit_button' className='toggle-popup toggle-edit-popup action-btn' onClick={() => handleShowPopup(row)}>Editar</button>
                <button id='delete_button' className='action-btn' onClick={() => handleDelete(row, setErrorMessage)}>Eliminar</button>
                <button id='to_invoice_button' className='action-btn' onClick={() => handleSendToInvoice(row, setErrorMessage)}>Enviar a Factura</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <EditPopupComponent
          title={popupTitle}
          fields={popupFields}
          onSubmit={handleEdit}
          handleClosePopup={handleClosePopup}
          formData={popupFields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {})}
          setErrorMessage={setErrorMessage}
          currentElementId={currentElementId}
          setUpdatedElements={setProducts}
        />
      )}
    </>
  )
}

export default TableComponent
