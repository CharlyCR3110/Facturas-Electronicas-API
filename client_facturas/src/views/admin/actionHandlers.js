export const fetchProviders = async (setProvidersList) => {
  try {
    const response = await fetch('http://localhost:8080/api/admins/dashboard', {
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
    setProvidersList(data)
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

export const handleChangeStatus = async (row, setElements) => {
  try {
    const response = await fetch(`http://localhost:8080/api/admins/changeProviderState?idProvider=${row[0]}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al cambiar el estado del proveedor')
    }

    const data = await response.json()
    setElements(data)
  } catch (error) {
    console.error(error)
  }
}
