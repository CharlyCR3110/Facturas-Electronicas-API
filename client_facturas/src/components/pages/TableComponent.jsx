import React from 'react'

const TableComponent = ({ headers, data, handleEdit, handleDelete, handleSendToInvoice, setErrorMessage }) => {
  return (
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
              <button id='edit_button' className='toggle-popup toggle-edit-popup action-btn' onClick={() => handleEdit(row, setErrorMessage)}>Editar</button>
              <button id='delete_button' className='action-btn' onClick={() => handleDelete(row, setErrorMessage)}>Eliminar</button>
              <button id='to_invoice_button' className='action-btn' onClick={() => handleSendToInvoice(row, setErrorMessage)}>Enviar a Factura</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableComponent
