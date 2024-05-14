import { DOMParser } from 'xmldom'
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
