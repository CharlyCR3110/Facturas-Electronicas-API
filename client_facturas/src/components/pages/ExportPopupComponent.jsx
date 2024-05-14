import React from 'react'
import { exportPDF, exportXML } from './exportHandlers'

const ExportPopupComponent = ({ handleClosePopup, setErrorMessage, invoiceId }) => {
  return (
    <div className='edit-popup export-popup'>
      <div className='popup-content'>
        <div className='popup-header'>
          <h2>Exportar Factura</h2>
        </div>

        <div className='popup-body'>
          <div className='export-btns'>
            <button className='action-btn pdf-btn' onClick={exportPDF.bind(null, invoiceId, setErrorMessage)}>PDF</button>
            <button className='action-btn xml-btn' onClick={exportXML.bind(null, invoiceId, setErrorMessage)}>XML</button>
          </div>
          <button className='cancel-btn' onClick={handleClosePopup}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default ExportPopupComponent
