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

    // Convertir la respuesta a un blob
    const blob = await response.blob()

    // Crear un objeto URL para el blob
    const url = window.URL.createObjectURL(new Blob([blob]))

    // Crear un enlace <a> para descargar el archivo
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'factura.pdf')

    // Simular clic en el enlace para iniciar la descarga
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
    // descargar el archivo
    const blob = new Blob([converted], { type: 'application/xml' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'factura.xml')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error al exportar la factura como XML:', error.message)
    setErrorMessage('No se pudo exportar la factura como XML')
  }
}
