import React from 'react'

const InvoiceDetailsPopupComponent = ({ factura, handleClosePopup }) => {
  const getFactura = () => factura.factura
  const getDetalles = () => factura.factura.detalles

  return (
    <div className='edit-popup details-popup'>
      <div className='popup-content'>
        <div className='popup-header'>
          <h2>Detalles de la Factura</h2>
        </div>
        <div className='popup-body'>
          <p>Fecha de Emisión: <span>{getFactura().fechaEmision}</span></p>
          <p>ID Proveedor: <span>{getFactura().idProveedor}</span></p>
          <p>ID Cliente: <span>{getFactura().idCliente}</span></p>
          <p>Subtotal: <span>{getFactura().subtotal}</span></p>
          <p>Impuesto: <span>{getFactura().impuesto}%</span></p>
          <p>Total: <span>{getFactura().total}</span></p>
          <table className='table details-table'>
            <thead>
              <tr>
                <th>ID Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {getDetalles().map((detalle, index) => (
                <tr key={index}>
                  <td>{detalle.idProducto}</td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.precioUnitario}</td>
                  <td>{detalle.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='cancel-btn' onClick={handleClosePopup}>Retroceder</button>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetailsPopupComponent
