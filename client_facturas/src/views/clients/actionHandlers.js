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
        throw new Error('Error al eliminar el cliente')
      }

      fetchUpdatedClients(setUpdatedElements)

      console.log('Cliente eliminado correctamente')
    })
    .catch(error => {
      console.error('Error al eliminar el cliente:', error.message)
      setErrorMessage(`Error al eliminar el cliente con id ${idCliente}`)
    })
}

const fetchUpdatedClients = async (setClients) => {
  try {
    const response = await fetch('http://localhost:8080/api/clients/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al obtener los clientes')
    }

    const data = await response.json()
    setClients(data)
  } catch (error) {
    console.error('Error al obtener los clientes:', error.message)
  }
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

    fetchUpdatedClients(setUpdatedElements)

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
      throw new Error('Error al agregar el cliente')
    }

    console.log('Cliente agregado correctamente')

    fetchUpdatedClients(setUpdatedElements)

    handleClosePopup()
  } catch (error) {
    console.error('Error al agregar el cliente:', error.message)
    setErrorMessage('Error al agregar el cliente')
  }
}
