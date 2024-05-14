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
