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
