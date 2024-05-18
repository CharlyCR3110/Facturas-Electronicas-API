import { toXML } from 'jstoxml'

export const exportPDF = async (invoiceId, setErrorMessage) => {
  try {
    const response = await fetch(`http://localhost:8080/api/invoices/export/pdf/${invoiceId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('No se pudo exportar la factura')
    }

    // Convertir la respuesta a un blob con el tipo MIME adecuado
    const blob = await response.blob()

    // URL para el blob con el tipo MIME adecuado (application/pdf)
    const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }))

    // abrir la URL en una nueva pestaña
    window.open(url, '_blank')
  } catch (error) {
    setErrorMessage('No se pudo exportar la factura')
  }
}

export const fetchDetailsInvoiceInfo = async (invoiceId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/invoices/details/${invoiceId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al obtener los detalles de la factura')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al obtener los detalles de la factura:', error.message)
  }
}

export const exportXML = async (invoiceId, setErrorMessage) => {
  try {
    // Obtener los detalles de la factura
    const facturaData = await fetchDetailsInvoiceInfo(invoiceId)

    // Reformatear los datos para que coincidan con la estructura deseada
    const facturaConDetallesDTO = {
      facturaConDetalles: {
        factura: {
          idFactura: invoiceId,
          fechaEmision: facturaData.factura.fechaEmision,
          idProveedor: facturaData.factura.idProveedor,
          idCliente: facturaData.factura.idCliente,
          subtotal: facturaData.factura.subtotal,
          impuesto: facturaData.factura.impuesto,
          total: facturaData.factura.total
        },
        detalles: facturaData.factura.detalles.map(detalle => ({
          detalle: {
            idProducto: detalle.idProducto,
            cantidad: detalle.cantidad,
            precioUnitario: detalle.precioUnitario,
            total: detalle.total
          }
        }))
      }
    }

    // Convertir los datos reformateados a XML
    const config = {
      indent: '    '
    }
    const converted = toXML(facturaConDetallesDTO, config)
    // Crear un blob con el contenido del XML
    const blob = new Blob([converted], { type: 'application/xml' })
    // Crear una URL para el blob
    const url = window.URL.createObjectURL(blob)

    // Abrir la URL en una nueva pesta
    window.open(url, '_blank')
  } catch (error) {
    console.error('Error al exportar la factura como XML:', error.message)
    setErrorMessage('No se pudo exportar la factura como XML')
  }
}
