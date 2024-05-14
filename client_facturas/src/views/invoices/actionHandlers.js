const fetchUpdatedInvoices = async (setInvoices) => {
  try {
    const response = await fetch('http://localhost:8080/api/invoices/', {
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
  } catch (error) {
    console.error('Error al obtener las facturas:', error.message)
  }
}

export const formatInvoices = (data) => {
  return data.map(item => ({
    idFactura: item.factura.idFactura,
    fechaEmision: new Date(item.factura.fechaEmision).toLocaleDateString('es-ES'),
    idProveedor: item.factura.idProveedor,
    idCliente: item.factura.idCliente,
    subtotal: item.factura.subtotal,
    impuesto: item.factura.impuesto + '%',
    total: item.factura.total
  }))
}
