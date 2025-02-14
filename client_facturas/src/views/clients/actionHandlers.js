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
  if (isClientInInvoice(idCliente, setErrorMessage)) {
    setErrorMessage('El cliente no puede ser eliminado porque actualmente se encuentra en la factura')
    return
  }

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
  if (isClientInInvoice(currentElementId)) {
    setErrorMessage('El cliente no puede ser editado porque actualmente se encuentra en la factura')
    handleClosePopup()
    return
  }

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
      const errorMessage = await response.text()
      throw new Error(errorMessage || 'Error al editar el cliente')
    }

    fetchClients(setUpdatedElements, null)

    handleClosePopup()
  } catch (error) {
    setErrorMessage(error.message)
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
    window.location.href = 'http://localhost:5173/invoice_creator'
  } catch (error) {
    console.error('Error al enviar el cliente a la factura:', error.message)
    setErrorMessage(`Error al enviar el cliente con id ${idCliente} a la factura`)
  }
}

const isClientInInvoice = (idCliente) => {
  const onInvoiceClient = JSON.parse(window.sessionStorage.getItem('onInvoiceClient'))
  if (onInvoiceClient) {
    if (onInvoiceClient.idCliente === idCliente) {
      return true
    }
  }
  return false
}
