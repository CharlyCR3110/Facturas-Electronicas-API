export const fetchClients = async (setClients, setLoading) => {
  try {
    const response = await fetch('http://localhost:8080/api/clients/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = '/login'
      }

      throw new Error('Error al obtener los clientes')
    }

    const data = await response.json()
    setClients(data)
    setLoading(false)
  } catch (error) {
    setLoading(false)
  }
}

export const handleDelete = (row, setErrorMessage, setUpdatedElements) => {
  const idCliente = row[0]
  fetch(`http://localhost:8080/api/clients/delete/${idCliente}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        const errorMessage = response.text()
        throw new Error(errorMessage || 'Error al eliminar el cliente')
      }

      fetchClients(setUpdatedElements, null)
    })
    .catch(error => {
      setErrorMessage(error.message)
    })
}

export const handleEdit = async (currentElementId, formData, setErrorMessage, setUpdatedElements, handleClosePopup) => {
  try {
    // URL de la solicitud
    const apiUrl = `http://localhost:8080/api/clients/update/${currentElementId}`

    const response = await fetch(apiUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error('Error al editar el cliente')
    }

    console.log('Cliente editado correctamente')

    fetchClients(setUpdatedElements, null)

    handleClosePopup()
  } catch (error) {
    console.error('Error al editar el cliente:', error.message)
    setErrorMessage(`Error al editar el cliente con id ${currentElementId}`)
  }
}

export const handleAdd = async (currentElementId, formData, setErrorMessage, setUpdatedElements, handleClosePopup) => {
  try {
    const response = await fetch('http://localhost:8080/api/clients/add', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      const errorMessage = await response.text()

      throw new Error(errorMessage || 'Error al agregar el cliente')
    }

    fetchClients(setUpdatedElements, null)

    handleClosePopup()
  } catch (error) {
    setErrorMessage(error.message)
  }
}

export const handleSearch = async (searchValue, setErrorMessage, setUpdatedElements) => {
  console.log('searchValue:', searchValue)
  try {
    const response = await fetch(`http://localhost:8080/api/clients/search?searchName=${searchValue}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al buscar clientes')
    }

    const data = await response.json()
    setUpdatedElements(data)
  } catch (error) {
    console.error('Error al buscar clientes:', error.message)
    setErrorMessage('Error al buscar clientes')
  }
}

export const handleSendToInvoice = async (row, setErrorMessage) => {
  const idCliente = row[0]
  try {
    const response = await fetch(`http://localhost:8080/api/invoices/sendClientToInvoiceCreator?idCliente=${idCliente}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al enviar el cliente a la factura')
    }

    console.log('cliente enviado a la factura correctamente')
    const data = await response.json()
    console.log(data)
    window.sessionStorage.setItem('onInvoiceClient', JSON.stringify(data))
  } catch (error) {
    console.error('Error al enviar el cliente a la factura:', error.message)
    setErrorMessage(`Error al enviar el cliente con id ${idCliente} a la factura`)
  }
}
