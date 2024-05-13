import React from 'react'

const TableComponent = ({ headers, data, handleEdit, handleDelete, handleSendToInvoice }) => {
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
              <button id='edit_button' className='toggle-popup toggle-edit-popup action-btn' onClick={() => handleEdit(row)}>Editar</button>
              <button id='delete_button' className='action-btn' onClick={() => handleDelete(row)}>Eliminar</button>
              <button id='to_invoice_button' className='action-btn' onClick={() => handleSendToInvoice(row)}>Enviar a Factura</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableComponent
