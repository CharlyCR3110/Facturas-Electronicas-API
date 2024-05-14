// http://localhost:8080/api/invoices/details/{id}
export const fetchDetailsInvoiceInfo = async (row) => {
  if (!row) {
    return null
  }
  try {
    const response = await fetch(`http://localhost:8080/api/invoices/details/${row[0]}`, {
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
