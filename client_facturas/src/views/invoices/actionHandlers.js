export const handleDelete = (row, setErrorMessage, setUpdatedElements) => {
  const idFactura = row[0]
  fetch(`http://localhost:8080/api/invoices/delete/${idFactura}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el factura')
      }

      fetchUpdatedInvoices(setUpdatedElements)

      console.log('Factura eliminado correctamente')
    })
    .catch(error => {
      console.error('Error al eliminar la factura:', error.message)
      setErrorMessage(`Error al eliminar la factura con id ${idFactura}`)
    })
}

export const fetchUpdatedInvoices = async (setInvoices) => {
  try {
    const response = await fetch('http://localhost:8080/api/invoices/history', {
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
